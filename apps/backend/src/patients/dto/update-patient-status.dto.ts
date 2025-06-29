import { IsUUID, IsNotEmpty } from 'class-validator'

export class UpdatePatientStatusDto {
	@IsUUID('4', { message: 'Must be a valid UUID' })
	@IsNotEmpty()
	status_id: string
}
