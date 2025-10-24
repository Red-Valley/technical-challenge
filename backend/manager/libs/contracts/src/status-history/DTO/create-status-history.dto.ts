import { IsDateString, IsUUID } from "@app/custom-class-validator/custom-class-validator";

export class CreateStatusHistoryDto {
  @IsUUID()
  patient_id: string;

  @IsUUID()
  status_id: string;
}
