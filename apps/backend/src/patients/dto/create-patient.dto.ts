import { IsString, IsNotEmpty, IsEmail, IsUUID, MinLength, MaxLength } from 'class-validator'

export class CreatePatientDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2, { message: 'Name must be at least 2 characters long' })
	@MaxLength(100, { message: 'Name cannot be longer than 100 characters' })
	full_name: string

	@IsEmail({}, { message: 'Must be a valid email address' })
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(10, { message: 'Phone must be at least 10 characters long' })
	@MaxLength(20, { message: 'Phone cannot be longer than 20 characters' })
	phone: string

	@IsUUID('4', { message: 'Must be a valid UUID' })
	@IsNotEmpty()
	provider_id: string

	@IsUUID('4', { message: 'Must be a valid UUID' })
	@IsNotEmpty()
	status_id: string
}
