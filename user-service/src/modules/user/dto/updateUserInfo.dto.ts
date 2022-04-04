import { IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateUserInfoDto {
	@IsOptional()
	@IsEmail()
	email: string;

	// @IsOptional()
	// role: number;

	// @IsOptional()
	// @IsBoolean()
	// isEnabled: boolean;

	@IsOptional()
	@IsInt()
	gender: number;

	@IsOptional()
	@IsDate()
	birthDay: Date;

	@IsOptional()
	@IsString()
	phoneNumber: string;

	@IsOptional()
	@IsString()
	@IsUrl()
	avatar: string;
}