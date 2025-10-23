import { IsInt, IsOptional, IsString, IsUUID } from "@app/custom-class-validator/custom-class-validator";

export class CreateStatusDto {
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  parent_id?: string;

  @IsInt()
  order: number;
}