import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {

  constructor(private readonly patientService: PatientsService) {}

  @Get('hello')
  getHello(): string {
    return this.patientService.getHello();
  }
}
