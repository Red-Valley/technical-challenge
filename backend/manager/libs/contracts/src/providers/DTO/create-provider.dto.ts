import { IsString } from "@app/custom-class-validator/custom-class-validator";

export class CreateProviderDto {

  @IsString()
  full_name: string;

  @IsString()
  specialty: string;
}