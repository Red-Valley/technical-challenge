import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class CreateProviderDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2, { message: 'Name must be at least 2 characters long' })
	@MaxLength(100, { message: 'Name cannot be longer than 100 characters' })
	full_name: string

	@IsString()
	@IsNotEmpty()
	@MinLength(2, { message: 'Specialty must be at least 2 characters long' })
	@MaxLength(50, { message: 'Specialty cannot be longer than 50 characters' })
	specialty: string
}
