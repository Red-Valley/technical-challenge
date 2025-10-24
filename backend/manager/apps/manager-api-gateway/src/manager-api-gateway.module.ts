import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { LoggerModule } from '@app/logger/logger.module';
import { ProvidersModule } from './providers/providers.module';
import { StatusesModule } from './statuses/statuses.module';
import { StatusHistoriesModule } from './status-histories/status-histories.module';

@Module({
  imports: [PatientsModule, LoggerModule, ProvidersModule, StatusesModule, StatusHistoriesModule],
  controllers: [],
  providers: [],
})
export class ManagerApiGatewayModule {}
