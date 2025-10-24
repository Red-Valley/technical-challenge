import { Test, TestingModule } from '@nestjs/testing';
import { StatusHistoriesService } from './status-histories.service';

describe('StatusHistoriesService', () => {
  let service: StatusHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusHistoriesService],
    }).compile();

    service = module.get<StatusHistoriesService>(StatusHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
