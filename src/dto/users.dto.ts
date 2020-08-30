import { IsNotEmpty, IsEmail, MinLength, IsAlphanumeric } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: "Email address is required" })
  @IsEmail({}, { message: "Invalid email address" })
  readonly login: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(9, { message: "Password should contain at least 9 characters" })
  @IsAlphanumeric("en-US", { message: "Password should contain only letters and numbers" })
  readonly password: string;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: "Email address is required" })
  @IsEmail({}, { message: "Invalid email address" })
  readonly login: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(9, { message: "Password should contain at least 9 characters" })
  @IsAlphanumeric("en-US", { message: "Password should contain only letters and numbers" })
  readonly password: string;

  @IsNotEmpty({ message: "Repeat password is required" })
  readonly repeat_password: string;
}