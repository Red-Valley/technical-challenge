import { SERVICE_NAME } from '@app/contracts/patients/patients.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PatientsService {

  constructor(
    @Inject(SERVICE_NAME) private readonly client: ClientProxy
  ) {}


  getHello(): string {
    this.client.emit('get_hello', { message: 'ping' });
    return 'Hello from Patients Service!';
  }
}
