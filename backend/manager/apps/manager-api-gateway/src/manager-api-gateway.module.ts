import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { LoggerModule } from '@app/logger/logger.module';

@Module({
  imports: [PatientsModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class ManagerApiGatewayModule {}
