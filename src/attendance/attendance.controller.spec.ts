import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceController } from './attendance.controller.js';
import { AttendanceService } from './attendance.service.js';

describe('AttendanceController', () => {
  let controller: AttendanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceController],
      providers: [
        AttendanceService,
        { provide: 'AttendanceModel', useValue: {} },
        { provide: 'SessionModel', useValue: {} },
        { provide: 'UserModel', useValue: {} },
      ],
    }).compile();

    controller = module.get<AttendanceController>(AttendanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
