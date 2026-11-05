import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto.js';
import { UpdateRoomDto } from './dto/update-room.dto.js';
import { Room } from './schema/rooms.schema.js';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room')
    private readonly roomModel: Model<Room>,
  ) {}

  async create(dto: CreateRoomDto) {
    const roomCode = dto.roomCode.trim();
    const building = dto.building.trim();
    const campus = dto.campus.trim();
    const exists = await this.roomModel.exists({ roomCode, campus });
    if (exists) {
      throw new ConflictException('Mã phòng đã tồn tại trong cơ sở này');
    }

    return this.roomModel.create({ roomCode, building, campus });
  }

  findAll() {
    return this.roomModel.find().sort({ campus: 1, roomCode: 1 }).exec();
  }

  async findOne(id: string) {
    await this.ensureValidId(id);
    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException('Phòng học không tồn tại');
    }
    return room;
  }

  async update(id: string, dto: UpdateRoomDto) {
    await this.ensureValidId(id);
    const current = await this.roomModel.findById(id).lean().exec();
    if (!current) {
      throw new NotFoundException('Phòng học không tồn tại');
    }

    const roomCode = dto.roomCode?.trim() ?? current.roomCode;
    const building = dto.building?.trim() ?? current.building;
    const campus = dto.campus?.trim() ?? current.campus;
    const duplicate = await this.roomModel.exists({
      _id: { $ne: id },
      roomCode,
      campus,
    });
    if (duplicate) {
      throw new ConflictException('Mã phòng đã tồn tại trong cơ sở này');
    }

    return this.roomModel
      .findByIdAndUpdate(
        id,
        { roomCode, building, campus },
        { new: true, runValidators: true },
      )
      .exec();
  }

  async remove(id: string) {
    await this.ensureValidId(id);
    const room = await this.roomModel.findByIdAndDelete(id).exec();
    if (!room) {
      throw new NotFoundException('Phòng học không tồn tại');
    }
    return { message: 'Xóa phòng học thành công' };
  }

  private async ensureValidId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Mã phòng học không hợp lệ');
    }
  }
}
