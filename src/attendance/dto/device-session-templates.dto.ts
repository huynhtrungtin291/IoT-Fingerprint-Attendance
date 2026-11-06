import { IsMongoId } from 'class-validator';

export class DeviceSessionTemplatesDto {
  @IsMongoId()
  sessionId: string;
}
