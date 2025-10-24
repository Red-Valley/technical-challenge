import { Test, TestingModule } from '@nestjs/testing';
import { StatusHistoriesController } from './status-histories.controller';

describe('StatusHistoriesController', () => {
  let controller: StatusHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusHistoriesController],
    }).compile();

    controller = module.get<StatusHistoriesController>(StatusHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
