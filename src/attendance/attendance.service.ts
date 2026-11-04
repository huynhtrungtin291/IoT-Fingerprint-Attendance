import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRole } from '../common/enum/user.enum.js';
import { Session } from '../sessions/schema/sessions.schema.js';
import { User } from '../users/schema/user.schema.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';
import { UpdateAttendanceDto } from './dto/update-attendance.dto.js';
import { Attendance } from './schema/attendance.schema.js';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('Attendance')
    private readonly attendanceModel: Model<Attendance>,
    @InjectModel('Session')
    private readonly sessionModel: Model<Session>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}


// fix lại này
// Máy vân tay
//   -> gửi fingerprintId, deviceCode, timestamp
// Backend
//   -> xác thực thiết bị
//   -> tìm sinh viên từ fingerprintId
//   -> tìm phòng từ deviceCode
//   -> tìm buổi học đang mở tại phòng đó và thời điểm đó
//   -> kiểm tra sinh viên có đăng ký lớp
//   -> tạo bản ghi attendance
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
