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
import { UserRole } from '../common/enum/user.enum.js';
import { Session } from '../sessions/schema/sessions.schema.js';
import { User } from '../users/schema/user.schema.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';
import { DeviceAttendanceDto } from './dto/device-attendance.dto.js';
import { DeviceSessionTemplatesDto } from './dto/device-session-templates.dto.js';
import { DeviceCheckInDto } from './dto/device-check-in.dto.js';
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

  async findSessionsForDevice(
    dto: DeviceAttendanceDto,
    deviceCode: string,
    deviceSecret: string,
  ) {
    const device = await this.deviceModel
      .findOne({ deviceCode: deviceCode.trim() })
      .select('+authSecretHash')
      .lean()
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

    const timestamp = new Date(dto.timestamp);
    const dayStart = new Date(timestamp);
    dayStart.setUTCHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

    await this.deviceModel.updateOne(
      { _id: device._id },
      { $set: { lastSeenAt: timestamp } },
    );

    const sessions = await this.sessionModel
      .find({
        startTime: { $gte: dayStart, $lt: dayEnd },
      })
      .select('startTime endTime attendanceOpenTime attendanceCloseTime')
      .sort({ startTime: 1 })
      .lean()
      .exec();

    return {
      date: dayStart.toISOString().slice(0, 10),
      sessions: sessions.map((session) => ({
        _id: session._id,
        startTime: session.startTime,
        endTime: session.endTime,
        attendanceOpenTime: session.attendanceOpenTime ?? null,
        attendanceCloseTime: session.attendanceCloseTime ?? null,
      })),
    };
  }

  async findSessionTemplatesForDevice(
    dto: DeviceSessionTemplatesDto,
    deviceCode: string,
    deviceSecret: string,
  ) {
    const device = await this.deviceModel
      .findOne({ deviceCode: deviceCode.trim() })
      .select('+authSecretHash')
      .lean()
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

    const session = await this.sessionModel
      .findById(dto.sessionId)
      .lean()
      .exec();
    if (!session) {
      throw new NotFoundException('Buổi học không tồn tại');
    }
    if (session.roomId.toString() !== device.roomId.toString()) {
      throw new UnauthorizedException(
        'Máy điểm danh không thuộc phòng của buổi học',
      );
    }

    const enrollments = await this.enrollmentModel
      .find({ sectionId: session.sectionId })
      .select('studentId')
      .lean()
      .exec();
    const studentIds = enrollments.map((enrollment) => enrollment.studentId);

    const fingerprints = await this.fingerprintModel
      .find({
        studentId: { $in: studentIds },
        status: FingerprintStatus.ACTIVE,
      })
      .select(
        'studentId templateData fingerPosition templateFormat algorithmVersion',
      )
      .lean()
      .exec();

    await this.deviceModel.updateOne(
      { _id: device._id },
      { $set: { lastSeenAt: new Date() } },
    );

    return {
      sessionId: session._id,
      templates: fingerprints.map((fingerprint) => ({
        studentId: fingerprint.studentId,
        templateData: fingerprint.templateData,
        fingerPosition: fingerprint.fingerPosition,
        templateFormat: fingerprint.templateFormat,
        algorithmVersion: fingerprint.algorithmVersion,
      })),
    };
  }

  async checkInFromDevice(
    dto: DeviceCheckInDto,
    deviceCode: string,
    deviceSecret: string,
  ) {
    const device = await this.deviceModel
      .findOne({ deviceCode: deviceCode.trim() })
      .select('+authSecretHash')
      .lean()
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

    const session = await this.sessionModel
      .findById(dto.sessionId)
      .lean()
      .exec();
    if (!session) {
      throw new NotFoundException('Buổi học không tồn tại');
    }
    if (session.roomId.toString() !== device.roomId.toString()) {
      throw new UnauthorizedException(
        'Máy điểm danh không thuộc phòng của buổi học',
      );
    }

    const checkInTime = new Date(dto.timestamp);
    const openTime = session.attendanceOpenTime ?? session.startTime;
    const closeTime = session.attendanceCloseTime ?? session.endTime;
    if (checkInTime < openTime || checkInTime > closeTime) {
      throw new BadRequestException(
        'Thời gian điểm danh không nằm trong khoảng cho phép',
      );
    }

    const enrollments = await this.enrollmentModel
      .find({ sectionId: session.sectionId })
      .select('studentId')
      .lean()
      .exec();
    const studentIds = enrollments.map((enrollment) => enrollment.studentId);

    const fingerprints = await this.fingerprintModel
      .find({
        studentId: { $in: studentIds },
        templateData: { $in: dto.templates },
        status: FingerprintStatus.ACTIVE,
      })
      .select('studentId templateData')
      .lean()
      .exec();

    const matchedStudentIds = [
      ...new Set(
        fingerprints.map((fingerprint) => fingerprint.studentId.toString()),
      ),
    ];
    const existingAttendances = await this.attendanceModel
      .find({
        sessionId: session._id,
        studentId: { $in: matchedStudentIds },
      })
      .select('studentId')
      .lean()
      .exec();
    const existingStudentIds = new Set(
      existingAttendances.map((attendance) => attendance.studentId.toString()),
    );
    const newStudentIds = matchedStudentIds.filter(
      (studentId) => !existingStudentIds.has(studentId),
    );
    const status =
      checkInTime.getTime() > session.startTime.getTime() + 15 * 60 * 1000
        ? AttendanceStatus.LATE
        : AttendanceStatus.PRESENT;

    if (newStudentIds.length > 0) {
      await this.attendanceModel.insertMany(
        newStudentIds.map((studentId) => ({
          sessionId: session._id,
          studentId: new Types.ObjectId(studentId),
          status,
          checkInTime,
          deviceId: device.deviceCode,
          method: AttendanceMethod.FINGERPRINT,
          receivedAt: checkInTime,
        })),
        { ordered: false },
      );
    }

    await this.deviceModel.updateOne(
      { _id: device._id },
      { $set: { lastSeenAt: checkInTime } },
    );

    return {
      sessionId: session._id,
      checkedInStudentIds: newStudentIds,
      alreadyCheckedInStudentIds: [...existingStudentIds],
      unmatchedTemplateCount: dto.templates.length - fingerprints.length,
    };
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
