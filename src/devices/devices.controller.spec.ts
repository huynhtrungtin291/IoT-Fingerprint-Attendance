import { Test, TestingModule } from '@nestjs/testing';
import { PasswordHasher } from '@nestjs/authentication';
import { DevicesController } from './devices.controller.js';
import { DevicesService } from './devices.service.js';

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        DevicesService,
        { provide: 'DeviceModel', useValue: {} },
        { provide: 'RoomModel', useValue: {} },
        { provide: PasswordHasher, useValue: {} },
      ],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
