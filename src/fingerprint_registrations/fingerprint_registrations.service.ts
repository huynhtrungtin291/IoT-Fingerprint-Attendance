import { ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordHasher } from '@nestjs/authentication';
import { Model, Types } from 'mongoose';
import { CreateFingerprintRegistrationDto } from './dto/create-fingerprint-registration.dto.js';
import { FingerprintRegistration,FingerprintRegistrationStatus,
} from './schema/fingerprint_registrations.schema.js';
import { User } from '../users/schema/user.schema.js';
import { UserRole } from '../common/enum/user.enum.js';
import { Device, DeviceStatus } from '../devices/schema/devices.schema.js';

@Injectable()
export class FingerprintRegistrationsService {
  private readonly registrationLifetimeMs = 5 * 60 * 1000;

  constructor(
    @InjectModel('FingerprintRegistration')
    private readonly registrationModel: Model<FingerprintRegistration>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Device') private readonly deviceModel: Model<Device>,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async create(dto: CreateFingerprintRegistrationDto) {
    const [student, device] = await Promise.all([
      this.userModel
        .findOne({ _id: dto.studentId, role: UserRole.STUDENT })
        .lean()
        .exec(),
      this.deviceModel
        .findById(dto.deviceId)
        .select('+authSecretHash')
        .lean()
        .exec(),
    ]);

    if (!student) {
      throw new NotFoundException('Sinh viên không tồn tại');
    }
    if (!device) {
      throw new NotFoundException('Máy điểm danh không tồn tại');
    }
    if (device.status !== DeviceStatus.ACTIVE) {
      throw new ConflictException('Máy điểm danh không ở trạng thái hoạt động');
    }

    const expiresAt = new Date(Date.now() + this.registrationLifetimeMs);
    const registration = await this.registrationModel.create({
      studentId: new Types.ObjectId(dto.studentId),
      deviceId: new Types.ObjectId(dto.deviceId),
      fingerPosition: dto.fingerPosition.trim(),
      status: FingerprintRegistrationStatus.PENDING,
      expiresAt,
    });

    return {
      registrationId: registration._id.toString(),
      studentId: registration.studentId.toString(),
      deviceId: registration.deviceId.toString(),
      fingerPosition: registration.fingerPosition,
      status: registration.status,
      expiresAt: registration.expiresAt,
    };
  }

  async findPendingForDevice(deviceCode: string, deviceSecret: string) {
    const device = await this.deviceModel
      .findOne({ deviceCode: deviceCode.trim() })
      .select('+authSecretHash')
      .exec();
    if ( !device || device.status !== DeviceStatus.ACTIVE || 
         !(await this.passwordHasher.verify(deviceSecret, device.authSecretHash))) {
      throw new UnauthorizedException(
        'Thông tin xác thực của máy không hợp lệ',
      );
    }

    const now = new Date();
    await this.registrationModel.updateMany(
      {
        deviceId: device._id,
        status: FingerprintRegistrationStatus.PENDING,
        expiresAt: { $lte: now },
      },
      { $set: { status: FingerprintRegistrationStatus.EXPIRED } },
    );

    await this.deviceModel.updateOne(
      { _id: device._id },
      { $set: { lastSeenAt: now } },
    );

    const registration = await this.registrationModel
      .findOne({
        deviceId: device._id,
        status: FingerprintRegistrationStatus.PENDING,
        expiresAt: { $gt: now },
      })
      .sort({ createdAt: 1 })
      .populate('studentId', 'studentCode')
      .lean()
      .exec();

    if (!registration) {
      return null;
    }

    const student = registration.studentId as unknown as {
      studentCode?: string;
    };
    return {
      registrationId: registration._id.toString(),
      studentCode: student.studentCode,
      fingerPosition: registration.fingerPosition,
      status: registration.status,
      expiresAt: registration.expiresAt,
    };
  }
}
