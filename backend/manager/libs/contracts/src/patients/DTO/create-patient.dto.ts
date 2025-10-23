import { IsEmail, IsString, IsUUID } from "@app/custom-class-validator/custom-class-validator";

export class CreatePatientDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsUUID()
  provider_id: string;

  @IsUUID()
  status_id: string;
}