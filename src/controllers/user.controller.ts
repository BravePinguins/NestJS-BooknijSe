import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/services/user.service";
import { RegisterUserDto } from "../models/dto/register/register-user.dto";
import { Response } from "express";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/users")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post("/register")
  @ApiOperation({
    summary: "User create",
  })
  @ApiBody({
    type: RegisterUserDto,
  })
  register(@Body() newUser: RegisterUserDto, @Res() res: Response) {
    return this.userService.register(newUser, res);
  }
}
