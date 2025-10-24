import { IsString, MaxLength } from "@app/custom-class-validator/custom-class-validator";

export class CreateProviderDto {

  @IsString()
  @MaxLength(50)
  full_name: string;

  @IsString()
  @MaxLength(50)
  specialty: string;
}