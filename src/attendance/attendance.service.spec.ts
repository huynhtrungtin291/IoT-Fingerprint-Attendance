import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service.js';

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        { provide: 'AttendanceModel', useValue: {} },
        { provide: 'SessionModel', useValue: {} },
        { provide: 'UserModel', useValue: {} },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
