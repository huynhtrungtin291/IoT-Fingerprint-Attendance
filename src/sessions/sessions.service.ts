import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSessionDto } from './dto/create-session.dto.js';
import { UpdateSessionDto } from './dto/update-session.dto.js';
import { Session, SessionStatus } from './schema/sessions.schema.js';
import { Section } from '../sections/schema/sections.schema.js';
import { Room } from '../rooms/schema/rooms.schema.js';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel('Session')
    private readonly sessionModel: Model<Session>,
    @InjectModel('Section')
    private readonly sectionModel: Model<Section>,
    @InjectModel('Room')
    private readonly roomModel: Model<Room>,
  ) {}

  async create(dto: CreateSessionDto) {
    await this.ensureSection(dto.sectionId);
    await this.ensureRoom(dto.roomId);
    const times = this.parseTimes(dto);
    const exists = await this.sessionModel.exists({
      sectionId: dto.sectionId,
      startTime: times.startTime,
    });

    if (exists) {
      throw new ConflictException(
        'Buổi học trong thời gian bắt đầu này đã tồn tại',
      );
    }

    return this.sessionModel.create({
      sectionId: new Types.ObjectId(dto.sectionId),
      roomId: new Types.ObjectId(dto.roomId),
      status: dto.status ?? SessionStatus.SCHEDULED,
      ...times,
    });
  }

  async findAll() {
    return this.sessionModel
      .find()
      .populate('sectionId', 'sectionCode courseId teacherId')
      .populate('roomId', 'roomCode building campus')
      .sort({ startTime: 1 })
      .exec();
  }

  async findOne(id: string) {
    await this.ensureValidId(id);
    const session = await this.sessionModel
      .findById(id)
      .populate('sectionId', 'sectionCode courseId teacherId')
      .populate('roomId', 'roomCode building campus')
      .exec();

    if (!session) {
      throw new NotFoundException('Buổi học không tồn tại');
    }

    return session;
  }

  async update(id: string, dto: UpdateSessionDto) {
    await this.ensureValidId(id);
    const current = await this.sessionModel.findById(id).lean().exec();
    if (!current) {
      throw new NotFoundException('Buổi học không tồn tại');
    }

    if (dto.sectionId !== undefined) {
      await this.ensureSection(dto.sectionId);
    }
    if (dto.roomId !== undefined) {
      await this.ensureRoom(dto.roomId);
    }

    const times = this.parseTimes({
      startTime: dto.startTime ?? current.startTime.toISOString(),
      endTime: dto.endTime ?? current.endTime.toISOString(),
      attendanceOpenTime:
        dto.attendanceOpenTime ?? current.attendanceOpenTime?.toISOString(),
      attendanceCloseTime:
        dto.attendanceCloseTime ?? current.attendanceCloseTime?.toISOString(),
    });
    const sectionId = dto.sectionId ?? current.sectionId.toString();
    const roomId = dto.roomId ?? current.roomId.toString();
    const duplicate = await this.sessionModel.exists({
      _id: { $ne: id },
      sectionId,
      startTime: times.startTime,
    });
    if (duplicate) {
      throw new ConflictException(
        'Buổi học trong thời gian bắt đầu này đã tồn tại',
      );
    }

    const session = await this.sessionModel
      .findByIdAndUpdate(
        id,
        {
          ...(dto.status !== undefined && { status: dto.status }),
          sectionId: new Types.ObjectId(sectionId),
          roomId: new Types.ObjectId(roomId),
          ...times,
        },
        { new: true, runValidators: true },
      )
      .populate('sectionId', 'sectionCode courseId teacherId')
      .populate('roomId', 'roomCode building campus')
      .exec();

    if (!session) {
      throw new NotFoundException('Buổi học không tồn tại');
    }

    return session;
  }

  async remove(id: string) {
    await this.ensureValidId(id);
    const session = await this.sessionModel.findByIdAndDelete(id).exec();
    if (!session) {
      throw new NotFoundException('Buổi học không tồn tại');
    }

    return { message: 'Xóa buổi học thành công' };
  }

  private async ensureSection(sectionId: string) {
    if (!Types.ObjectId.isValid(sectionId)) {
      throw new BadRequestException('Mã lớp học phần không hợp lệ');
    }
    if (!(await this.sectionModel.exists({ _id: sectionId }))) {
      throw new NotFoundException('Lớp học phần không tồn tại');
    }
  }

  private async ensureRoom(roomId: string) {
    if (!Types.ObjectId.isValid(roomId)) {
      throw new BadRequestException('Mã phòng học không hợp lệ');
    }
    if (!(await this.roomModel.exists({ _id: roomId }))) {
      throw new NotFoundException('Phòng học không tồn tại');
    }
  }

  private parseTimes(dto: {
    startTime: string;
    endTime: string;
    attendanceOpenTime?: string | null;
    attendanceCloseTime?: string | null;
  }) {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);
    const attendanceOpenTime = dto.attendanceOpenTime
      ? new Date(dto.attendanceOpenTime)
      : undefined;
    const attendanceCloseTime = dto.attendanceCloseTime
      ? new Date(dto.attendanceCloseTime)
      : undefined;

    if (
      Number.isNaN(startTime.getTime()) ||
      Number.isNaN(endTime.getTime()) ||
      endTime <= startTime
    ) {
      throw new BadRequestException('endTime phải sau startTime');
    }
    if (
      (attendanceOpenTime && Number.isNaN(attendanceOpenTime.getTime())) ||
      (attendanceCloseTime && Number.isNaN(attendanceCloseTime.getTime()))
    ) {
      throw new BadRequestException('Thời gian điểm danh không hợp lệ');
    }
    if (
      attendanceOpenTime &&
      attendanceCloseTime &&
      attendanceCloseTime <= attendanceOpenTime
    ) {
      throw new BadRequestException(
        'attendanceCloseTime phải sau attendanceOpenTime',
      );
    }

    return { startTime, endTime, attendanceOpenTime, attendanceCloseTime };
  }

  private async ensureValidId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Mã buổi học không hợp lệ');
    }
  }
}
