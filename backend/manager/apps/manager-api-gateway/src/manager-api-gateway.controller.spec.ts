import { Test, TestingModule } from '@nestjs/testing';
import { ManagerApiGatewayController } from './manager-api-gateway.controller';
import { ManagerApiGatewayService } from './manager-api-gateway.service';

describe('ManagerApiGatewayController', () => {
  let managerApiGatewayController: ManagerApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ManagerApiGatewayController],
      providers: [ManagerApiGatewayService],
    }).compile();

    managerApiGatewayController = app.get<ManagerApiGatewayController>(ManagerApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(managerApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
