import { Test, TestingModule } from '@nestjs/testing';
import { StatusHistoryController } from './status-history.controller';
import { StatusHistoryService } from './status-history.service';

describe('StatusHistoryController', () => {
  let statusHistoryController: StatusHistoryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatusHistoryController],
      providers: [StatusHistoryService],
    }).compile();

    statusHistoryController = app.get<StatusHistoryController>(StatusHistoryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(statusHistoryController.getHello()).toBe('Hello World!');
    });
  });
});
