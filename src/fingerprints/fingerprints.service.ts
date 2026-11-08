import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRole } from '../common/enum/user.enum.js';
import { User } from '../users/schema/user.schema.js';
import { CreateFingerprintDto } from './dto/create-fingerprint.dto.js';
import { UpdateFingerprintDto } from './dto/update-fingerprint.dto.js';
import {
  Fingerprint,
  FingerprintStatus,
} from './schema/fingerprints.schema.js';
import { PasswordHasher } from '@nestjs/authentication';
import { FingerprintRegistration, FingerprintRegistrationStatus } from '../fingerprint_registrations/schema/fingerprint_registrations.schema.js';
import { Device, DeviceStatus } from '../devices/schema/devices.schema.js';

@Injectable()
export class FingerprintsService {
  constructor(
    @InjectModel('Fingerprint')
    private readonly fingerprintModel: Model<Fingerprint>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('FingerprintRegistration')
    private readonly registrationModel: Model<FingerprintRegistration>,
    @InjectModel('Device')
    private readonly deviceModel: Model<Device>,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async create(
    dto: CreateFingerprintDto,
    deviceCode: string,
    deviceSecret: string,
  ) {
    const device = await this.deviceModel
      .findOne({ deviceCode: deviceCode.trim() })
      .select('+authSecretHash')
      .exec();

    if (
      !device ||
      device.status !== DeviceStatus.ACTIVE ||
      !(await this.passwordHasher.verify(deviceSecret, device.authSecretHash))
    ) {
      throw new UnauthorizedException(
        'Thông tin xác thực của máy không hợp lệ',
      );
    }

    const session = await this.fingerprintModel.db.startSession();

    try {
      return await session.withTransaction(async () => {
        const registration = await this.registrationModel
          .findOne({ _id: dto.registrationId, deviceId: device._id })
          .session(session)
          .exec();

        if (!registration) {
          throw new NotFoundException(
            'Lượt đăng ký không tồn tại hoặc không thuộc máy này',
          );
        }

        // Máy gửi lại sau khi đã hoàn tất thì trả mẫu đã lưu.
        if (registration.status === FingerprintRegistrationStatus.COMPLETED) {
          const fingerprint = await this.fingerprintModel
            .findOne({ registrationId: registration._id })
            .session(session)
            .exec();

          if (!fingerprint) {
            throw new ConflictException(
              'Lượt đăng ký đã hoàn tất nhưng không tìm thấy mẫu',
            );
          }

          return {
            registrationId: registration._id.toString(),
            fingerprintId: fingerprint._id.toString(),
            status: registration.status,
          };
        }

        const now = new Date();

        if (registration.status !== FingerprintRegistrationStatus.PENDING) {
          throw new ConflictException(
            'Lượt đăng ký không còn ở trạng thái chờ',
          );
        }

        if (registration.expiresAt <= now) {
          throw new BadRequestException('Lượt đăng ký đã hết hạn');
        }

        await this.ensureStudent(registration.studentId.toString());

        const fingerPosition = registration.fingerPosition.trim();

        const exists = await this.fingerprintModel
          .exists({
            studentId: registration.studentId,
            fingerPosition,
          })
          .session(session);

        if (exists) {
          throw new ConflictException('Sinh viên đã đăng ký ngón tay này');
        }

        const claimed = await this.registrationModel.updateOne(
          {
            _id: registration._id,
            deviceId: device._id,
            status: FingerprintRegistrationStatus.PENDING,
            expiresAt: { $gt: now },
          },
          {
            $set: {
              status: FingerprintRegistrationStatus.PROCESSING,
            },
          },
          { session },
        );

        if (claimed.modifiedCount !== 1) {
          throw new ConflictException(
            'Lượt đăng ký đã được xử lý hoặc đã hết hạn',
          );
        }

        // Giữ nguyên theo giả định xử lý mẫu hiện tại của bạn.

        const [fingerprint] = await this.fingerprintModel.create(
          [
            {
              registrationId: registration._id,
              studentId: registration.studentId,
              fingerPosition,
              templateData: dto.templateData,
              templateFormat: dto.templateFormat.trim(),
              algorithmVersion: dto.algorithmVersion.trim(),
              status: FingerprintStatus.ACTIVE,
            },
          ],
          { session },
        );

        await this.registrationModel.updateOne(
          {
            _id: registration._id,
            status: FingerprintRegistrationStatus.PROCESSING,
          },
          {
            $set: {
              status: FingerprintRegistrationStatus.COMPLETED,
            },
          },
          { session },
        );

        return {
          registrationId: registration._id.toString(),
          fingerprintId: fingerprint._id.toString(),
          status: FingerprintRegistrationStatus.COMPLETED,
        };
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ConflictException('Sinh viên đã đăng ký ngón tay này');
      }
      throw error;
    } finally {
      await session.endSession();
    }
  }

  getAllFingerprint() {
    return this.fingerprintModel
      .find()
      .populate('studentId', 'fullName userName studentCode')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getAllFingerprintWithClass(classId: string) {
    if (!Types.ObjectId.isValid(classId)) {
      throw new BadRequestException('Mã lớp không hợp lệ');
    }

    const students = await this.userModel
      .find({
        classId: new Types.ObjectId(classId),
        role: UserRole.STUDENT,
      })
      .select('_id')
      .lean()
      .exec();

    return this.fingerprintModel
      .find({ studentId: { $in: students.map((student) => student._id) } })
      .populate('studentId', 'fullName userName studentCode classId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    await this.ensureValidId(id);
    const fingerprint = await this.fingerprintModel
      .findById(id)
      .populate('studentId', 'fullName userName studentCode')
      .exec();
    if (!fingerprint) {
      throw new NotFoundException('Mẫu vân tay không tồn tại');
    }
    return fingerprint;
  }

  async update(id: string, dto: UpdateFingerprintDto) {
    await this.ensureValidId(id);
    const current = await this.fingerprintModel.findById(id).lean().exec();
    if (!current) {
      throw new NotFoundException('Mẫu vân tay không tồn tại');
    }

    const studentId = dto.studentId ?? current.studentId.toString();
    await this.ensureStudent(studentId);
    const fingerPosition = dto.fingerPosition?.trim() ?? current.fingerPosition;
    const duplicate = await this.fingerprintModel.exists({
      _id: { $ne: id },
      studentId,
      fingerPosition,
    });
    if (duplicate) {
      throw new ConflictException('Sinh viên đã đăng ký ngón tay này');
    }

    const updateData: Record<string, unknown> = {
      studentId: new Types.ObjectId(studentId),
      fingerPosition,
    };
    if (dto.templateData !== undefined)
      updateData.templateData = dto.templateData;
    if (dto.templateFormat !== undefined) {
      updateData.templateFormat = dto.templateFormat.trim();
    }
    if (dto.algorithmVersion !== undefined) {
      updateData.algorithmVersion = dto.algorithmVersion.trim();
    }
    if (dto.status !== undefined) updateData.status = dto.status;

    return this.fingerprintModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .populate('studentId', 'fullName userName studentCode')
      .exec();
  }

  async remove(id: string) {
    await this.ensureValidId(id);
    const fingerprint = await this.fingerprintModel
      .findByIdAndDelete(id)
      .exec();
    if (!fingerprint) {
      throw new NotFoundException('Mẫu vân tay không tồn tại');
    }
    return { message: 'Xóa mẫu vân tay thành công' };
  }

  private async ensureStudent(studentId: string) {
    if (!Types.ObjectId.isValid(studentId)) {
      throw new BadRequestException('Mã sinh viên không hợp lệ');
    }
    if (
      !(await this.userModel.exists({ _id: studentId, role: UserRole.STUDENT }))
    ) {
      throw new NotFoundException(
        'Sinh viên không tồn tại hoặc không có vai trò student',
      );
    }
  }

  private async ensureValidId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Mã mẫu vân tay không hợp lệ');
    }
  }
}
