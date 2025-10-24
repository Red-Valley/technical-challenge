import { IsEmail, IsString, IsUUID, MaxLength } from "@app/custom-class-validator/custom-class-validator";

export class CreatePatientDto {
  @IsString()
  @MaxLength(50)
  full_name: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MaxLength(15)
  phone: string;

  @IsUUID()
  provider_id: string;

  @IsUUID()
  status_id: string;
}