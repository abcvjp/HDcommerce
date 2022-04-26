import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsNotEmpty()
  @Length(6, 32)
  readonly password: string;
}
