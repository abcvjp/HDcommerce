import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsOptional()
	role: number;

	@IsNotEmpty()
	@IsInt()
	gender: number;

	@IsNotEmpty()
	@IsDate()
	birthDay: Date;

	@IsNotEmpty()
	@IsString()
	phoneNumber: string;

	@IsOptional()
	@IsString()
	address: string;
}