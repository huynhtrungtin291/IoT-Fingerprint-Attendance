import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordHasher } from '@nestjs/authentication';
import { Model, Types } from 'mongoose';
import { Device, DeviceStatus } from '../devices/schema/devices.schema.js';
import { Enrollment } from '../enrollments/schema/enrollments.schema.js';
import {
  Fingerprint,
  FingerprintStatus,
} from '../fingerprints/schema/fingerprints.schema.js';
import { SessionStatus } from '../sessions/schema/sessions.schema.js';
import { UserRole } from '../common/enum/user.enum.js';
import { Session } from '../sessions/schema/sessions.schema.js';
import { User } from '../users/schema/user.schema.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';
import { DeviceAttendanceDto } from './dto/device-attendance.dto.js';
import { UpdateAttendanceDto } from './dto/update-attendance.dto.js';
import {
  Attendance,
  AttendanceMethod,
  AttendanceStatus,
} from './schema/attendance.schema.js';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('Attendance')
    private readonly attendanceModel: Model<Attendance>,
    @InjectModel('Session')
    private readonly sessionModel: Model<Session>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Device')
    private readonly deviceModel: Model<Device>,
    @InjectModel('Fingerprint')
    private readonly fingerprintModel: Model<Fingerprint>,
    @InjectModel('Enrollment')
    private readonly enrollmentModel: Model<Enrollment>,
    private readonly passwordHasher: PasswordHasher,
  ) {}


  async create(dto: CreateAttendanceDto) {
    await this.ensureReferences(dto.sessionId, dto.studentId);
    const exists = await this.attendanceModel.exists({
      sessionId: dto.sessionId,
      studentId: dto.studentId,
    });
    if (exists) {
      throw new ConflictException(
        'Sinh viên đã có kết quả điểm danh trong buổi này',
      );
    }

    return this.attendanceModel.create({
      sessionId: new Types.ObjectId(dto.sessionId),
      studentId: new Types.ObjectId(dto.studentId),
      status: dto.status,
      checkInTime: dto.checkInTime ? new Date(dto.checkInTime) : null,
      deviceId: dto.deviceId?.trim(),
      method: dto.method,
      receivedAt: dto.receivedAt ? new Date(dto.receivedAt) : new Date(),
    });
  }

  async deviceCheckIn(dto: DeviceAttendanceDto) {
    const device = await this.deviceModel
      .findOne({ deviceCode: dto.deviceCode.trim() })
      .select('+authSecretHash')
      .exec();

    if (
      !device ||
      !(await this.passwordHasher.verify(dto.authSecret, device.authSecretHash))
    ) {
      throw new UnauthorizedException('Thông tin máy điểm danh không hợp lệ');
    }

    if (device.status !== DeviceStatus.ACTIVE) {
      throw new UnauthorizedException('Máy điểm danh đang bị vô hiệu hóa');
    }

    const deviceTimestamp = new Date(dto.timestamp);

    if (Number.isNaN(deviceTimestamp.getTime())) {
      throw new BadRequestException('timestamp không hợp lệ');
    }

    const now = new Date();

    if (Math.abs(now.getTime() - deviceTimestamp.getTime()) > 5 * 60 * 1000) {
      throw new BadRequestException('Thời gian trên máy không hợp lệ');
    }

    await this.deviceModel.updateOne(
      { _id: device._id },
      { $set: { lastSeenAt: now } },
    );

    const allFingerprints = await this.fingerprintModel
      .find({ status: FingerprintStatus.ACTIVE })
      .select('_id studentId templateData')
      .lean()
      .exec();

    let matchedFingerprint: (typeof allFingerprints)[number] | null = null;

    for (const fingerprint of allFingerprints) {
      const isMatch = await this.passwordHasher.verify(
        dto.templateData,
        fingerprint.templateData,
      );

      if (isMatch) {
        matchedFingerprint = fingerprint;
        break;
      }
    }

    if (!matchedFingerprint) {
      throw new NotFoundException('Không tìm thấy mẫu khớp');
    }

    const studentId = matchedFingerprint.studentId;

    const sessions = await this.sessionModel
      .find({
        roomId: device.roomId,
        status: SessionStatus.OPEN,
      })
      .exec();

    const session = sessions.find((candidate) => {
      const openTime = candidate.attendanceOpenTime ?? candidate.startTime;
      const closeTime = candidate.attendanceCloseTime ?? candidate.endTime;

      return now >= openTime && now <= closeTime;
    });

    if (!session) {
      throw new BadRequestException(
        'Hiện không có buổi học mở điểm danh tại phòng này',
      );
    }

    const enrolled = await this.enrollmentModel.exists({
      sectionId: session.sectionId,
      studentId,
    });

    if (!enrolled) {
      throw new BadRequestException(
        'Sinh viên không thuộc lớp học phần của buổi này',
      );
    }

    const exists = await this.attendanceModel.exists({
      sessionId: session._id,
      studentId,
    });

    if (exists) {
      throw new ConflictException(
        'Sinh viên đã có kết quả điểm danh trong buổi này',
      );
    }

    const status =
      now > session.startTime
        ? AttendanceStatus.LATE
        : AttendanceStatus.PRESENT;

    return this.attendanceModel.create({
      sessionId: session._id,
      studentId,
      status,
      checkInTime: now,
      deviceId: device.deviceCode,
      method: AttendanceMethod.FINGERPRINT,
      receivedAt: now,
    });
  }

  async findAll() {
    return this.attendanceModel
      .find()
      .populate('sessionId', 'sectionId status startTime endTime')
      .populate('studentId', 'fullName userName studentCode')
      .sort({ receivedAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    await this.ensureValidId(id);
    const attendance = await this.attendanceModel
      .findById(id)
      .populate('sessionId', 'sectionId status startTime endTime')
      .populate('studentId', 'fullName userName studentCode')
      .exec();
    if (!attendance) {
      throw new NotFoundException('Kết quả điểm danh không tồn tại');
    }
    return attendance;
  }

  async update(id: string, dto: UpdateAttendanceDto) {
    await this.ensureValidId(id);
    const current = await this.attendanceModel.findById(id).lean().exec();
    if (!current) {
      throw new NotFoundException('Kết quả điểm danh không tồn tại');
    }

    const sessionId = dto.sessionId ?? current.sessionId.toString();
    const studentId = dto.studentId ?? current.studentId.toString();
    await this.ensureReferences(sessionId, studentId);
    const duplicate = await this.attendanceModel.exists({
      _id: { $ne: id },
      sessionId,
      studentId,
    });
    if (duplicate) {
      throw new ConflictException(
        'Sinh viên đã có kết quả điểm danh trong buổi này',
      );
    }

    const attendance = await this.attendanceModel
      .findByIdAndUpdate(
        id,
        {
          sessionId: new Types.ObjectId(sessionId),
          studentId: new Types.ObjectId(studentId),
          ...(dto.status !== undefined && { status: dto.status }),
          ...(dto.checkInTime !== undefined && {
            checkInTime: dto.checkInTime ? new Date(dto.checkInTime) : null,
          }),
          ...(dto.deviceId !== undefined && { deviceId: dto.deviceId.trim() }),
          ...(dto.method !== undefined && { method: dto.method }),
          ...(dto.receivedAt !== undefined && {
            receivedAt: new Date(dto.receivedAt),
          }),
        },
        { new: true, runValidators: true },
      )
      .populate('sessionId', 'sectionId status startTime endTime')
      .populate('studentId', 'fullName userName studentCode')
      .exec();
    if (!attendance) {
      throw new NotFoundException('Kết quả điểm danh không tồn tại');
    }
    return attendance;
  }

  async remove(id: string) {
    await this.ensureValidId(id);
    const attendance = await this.attendanceModel.findByIdAndDelete(id).exec();
    if (!attendance) {
      throw new NotFoundException('Kết quả điểm danh không tồn tại');
    }
    return { message: 'Xóa kết quả điểm danh thành công' };
  }

  private async ensureReferences(sessionId: string, studentId: string) {
    if (
      !Types.ObjectId.isValid(sessionId) ||
      !Types.ObjectId.isValid(studentId)
    ) {
      throw new BadRequestException('Mã tham chiếu không hợp lệ');
    }
    if (!(await this.sessionModel.exists({ _id: sessionId }))) {
      throw new NotFoundException('Buổi học không tồn tại');
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
      throw new BadRequestException('Mã điểm danh không hợp lệ');
    }
  }
}
