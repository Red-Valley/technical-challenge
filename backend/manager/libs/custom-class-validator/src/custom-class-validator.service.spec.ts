import { Test, TestingModule } from '@nestjs/testing';
import { CustomClassValidatorService } from './custom-class-validator.service';

describe('CustomClassValidatorService', () => {
  let service: CustomClassValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomClassValidatorService],
    }).compile();

    service = module.get<CustomClassValidatorService>(CustomClassValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
