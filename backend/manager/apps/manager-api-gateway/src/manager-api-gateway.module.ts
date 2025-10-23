import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { LoggerModule } from '@app/logger/logger.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [PatientsModule, LoggerModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class ManagerApiGatewayModule {}
