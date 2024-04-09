import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginDto {
  @ApiProperty({
    example: "john@example.com",
    description: "User email address",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "User password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
