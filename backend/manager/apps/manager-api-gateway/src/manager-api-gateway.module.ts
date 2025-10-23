import { Module } from '@nestjs/common';
import { ManagerApiGatewayController } from './manager-api-gateway.controller';
import { ManagerApiGatewayService } from './manager-api-gateway.service';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [PatientsModule],
  controllers: [ManagerApiGatewayController],
  providers: [ManagerApiGatewayService],
})
export class ManagerApiGatewayModule {}
