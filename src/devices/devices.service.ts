import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordHasher } from '@nestjs/authentication';
import { Model, Types } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device.dto.js';
import { UpdateDeviceDto } from './dto/update-device.dto.js';
import { Device, DeviceStatus } from './schema/devices.schema.js';
import { Room } from '../rooms/schema/rooms.schema.js';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel('Device')
    private readonly deviceModel: Model<Device>,
    @InjectModel('Room')
    private readonly roomModel: Model<Room>,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async create(dto: CreateDeviceDto) {
    await this.ensureRoom(dto.roomId);
    const exists = await this.deviceModel.exists({
      deviceCode: dto.deviceCode,
    });
    if (exists) {
      throw new ConflictException('Mã máy đã tồn tại');
    }

    const authSecretHash = await this.passwordHasher.hash(dto.authSecret);
    const device = await this.deviceModel.create({
      deviceCode: dto.deviceCode.trim(),
      deviceName: dto.deviceName.trim(),
      roomId: new Types.ObjectId(dto.roomId),
      status: dto.status ?? DeviceStatus.ACTIVE,
      authSecretHash,
      lastSeenAt: dto.lastSeenAt ? new Date(dto.lastSeenAt) : undefined,
    });

    const { authSecretHash: _authSecretHash, ...safeDevice } =
      device.toObject();
    return safeDevice;
  }

  async getAllDevice() {
    return await this.deviceModel
      .find()
      .populate('roomId', 'roomCode building campus')
      .sort({ deviceCode: 1 })
      .exec();
  }

  async findOne(id: string) {
    await this.ensureValidId(id);
    const device = await this.deviceModel
      .findById(id)
      .populate('roomId', 'roomCode building campus')
      .exec();
    if (!device) {
      throw new NotFoundException('Máy điểm danh không tồn tại');
    }
    return device;
  }

  async update(id: string, dto: UpdateDeviceDto) {
    await this.ensureValidId(id);
    const current = await this.deviceModel.findById(id).exec();
    if (!current) {
      throw new NotFoundException('Máy điểm danh không tồn tại');
    }
    if (dto.roomId !== undefined) {
      await this.ensureRoom(dto.roomId);
    }
    if (
      dto.deviceCode !== undefined &&
      (await this.deviceModel.exists({
        _id: { $ne: id },
        deviceCode: dto.deviceCode,
      }))
    ) {
      throw new ConflictException('Mã máy đã tồn tại');
    }

    const updateData: Record<string, unknown> = {};
    if (dto.deviceCode !== undefined)
      updateData.deviceCode = dto.deviceCode.trim();
    if (dto.deviceName !== undefined)
      updateData.deviceName = dto.deviceName.trim();
    if (dto.roomId !== undefined)
      updateData.roomId = new Types.ObjectId(dto.roomId);
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.lastSeenAt !== undefined) {
      updateData.lastSeenAt = dto.lastSeenAt ? new Date(dto.lastSeenAt) : null;
    }
    if (dto.authSecret !== undefined) {
      updateData.authSecretHash = await this.passwordHasher.hash(
        dto.authSecret,
      );
    }

    return this.deviceModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .populate('roomId', 'roomCode building campus')
      .exec();
  }

  async remove(id: string) {
    await this.ensureValidId(id);
    const device = await this.deviceModel.findByIdAndDelete(id).exec();
    if (!device) {
      throw new NotFoundException('Máy điểm danh không tồn tại');
    }
    return { message: 'Xóa máy điểm danh thành công' };
  }

  private async ensureRoom(roomId: string) {
    if (!Types.ObjectId.isValid(roomId)) {
      throw new BadRequestException('Mã phòng học không hợp lệ');
    }
    if (!(await this.roomModel.exists({ _id: roomId }))) {
      throw new NotFoundException('Phòng học không tồn tại');
    }
  }

  private async ensureValidId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Mã máy điểm danh không hợp lệ');
    }
  }
}
