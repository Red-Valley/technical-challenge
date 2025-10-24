import { Module } from '@nestjs/common';
import { CustomClassValidatorService } from './custom-class-validator.service';

@Module({
  providers: [CustomClassValidatorService],
  exports: [CustomClassValidatorService],
})
export class CustomClassValidatorModule {}
