import { IsInt, IsOptional, IsString, IsUUID, Max, MaxLength } from "@app/custom-class-validator/custom-class-validator";

export class CreateStatusDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsUUID()
  @IsOptional()
  parent_id?: string;

  @IsInt()
  @Max(9999999999)
  order: number;
}