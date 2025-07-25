import { IsNotEmpty, IsUUID } from 'class-validator';

export class ChangeStatusDto {
  @IsNotEmpty()
  @IsUUID()
  statusId: string;
}
