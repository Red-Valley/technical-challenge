import { IsUUID } from "@app/custom-class-validator/custom-class-validator";

export class IdDto {

  @IsUUID()
  id: string;
}