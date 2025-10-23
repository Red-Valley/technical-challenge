import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients/patients.service';

@Controller('api')
export class ManagerApiGatewayController {
  constructor(private readonly patientService: PatientsService) {}

  @Get('hello')
  getHello(): string {
    return this.patientService.getHello();
  }
}
