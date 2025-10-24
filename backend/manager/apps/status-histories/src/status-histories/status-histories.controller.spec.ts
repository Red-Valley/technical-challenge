import { Test, TestingModule } from '@nestjs/testing';
import { StatusHistoriesController } from './status-histories.controller';
import { StatusHistoriesService } from './status-histories.service';

describe('StatusHistoriesController', () => {
  let controller: StatusHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusHistoriesController],
      providers: [StatusHistoriesService],
    }).compile();

    controller = module.get<StatusHistoriesController>(StatusHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
