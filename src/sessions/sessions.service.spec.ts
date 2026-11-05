import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service.js';

describe('SessionsService', () => {
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        { provide: 'SessionModel', useValue: {} },
        { provide: 'SectionModel', useValue: {} },
        { provide: 'RoomModel', useValue: {} },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
