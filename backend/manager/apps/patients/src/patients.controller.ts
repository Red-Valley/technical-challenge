import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @MessagePattern('get_hello')
  handleHello(data: any) {
    console.log('📩 Received from gateway:', data);
    return 'Hello from Patients Microservice!';
  }
}

