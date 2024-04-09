import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ROLE } from "../../user.model";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  @ApiProperty({
    example: "john@example.com",
    description: "User email address",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "John",
    description: "User first name",
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: "Kowalski",
    description: "User last name",
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: "password123",
    description: "User password",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: "c36ae975-3de8-483e-96d1-6686616fae50",
    description: "User current login token",
  })
  @IsOptional()
  @IsString()
  currentTokenId: string | null;

  @ApiProperty({
    example: ROLE.USER,
    description: "User role",
    enum: ROLE,
  })
  @IsEnum(ROLE)
  role: ROLE;
}
