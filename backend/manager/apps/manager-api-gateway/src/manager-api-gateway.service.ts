import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class ManagerApiGatewayService {

  getHello(): string {
    return 'Hello World!';
  }
}
