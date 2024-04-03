import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ROLE } from "../../user.model";

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  firstName: string;

  @IsNotEmpty()
  @IsEmail()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  currentTokenId: string | null;

  @IsEnum(ROLE)
  role: ROLE;
}
