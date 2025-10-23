import { Injectable } from '@nestjs/common';

@Injectable()
export class ProvidersService {
  findAll() {
    return [];
  }

  findOne(id: string) {
    return { id };
  }

  create(data: any) {
    return { id: 'new-id', ...data };
  }

  update(id: string, data: any) {
    return { id, ...data };
  }

  remove(id: string) {
    return true;
  }
}
