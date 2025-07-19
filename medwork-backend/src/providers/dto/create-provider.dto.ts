import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  specialty: string;
}