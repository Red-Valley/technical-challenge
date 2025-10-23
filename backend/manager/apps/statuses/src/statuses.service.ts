import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusesService {
  getHello(): string {
    return 'Hello World!';
  }
}
