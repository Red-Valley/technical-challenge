import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { SharedClientModule } from '../shared-client/shared-client.module';
import { PatientsController } from './patients.controller';
import { QUEUE_NAME, SERVICE_NAME } from '@app/contracts/patients/patients.constants';

@Module({
  imports: [
    SharedClientModule.register(SERVICE_NAME, QUEUE_NAME)
  ],
  providers: [PatientsService],
  exports: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
