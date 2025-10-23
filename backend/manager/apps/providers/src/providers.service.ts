import { Injectable } from '@nestjs/common';

@Injectable()
export class ProvidersService {
  getHello(): string {
    return 'Hello World!';
  }
}
