import { Controller, Post, Body, Get, Res } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthLoginDto } from "../models/dto/auth/auth-login.dto";
import { User } from "../models/user.model";
import { UserObj } from "../common/decorators/user-obj.decorator";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() dto: AuthLoginDto, @Res() res: Response): Promise<any> {
    return this.authService.login(dto, res);
  }

  @Get("/logout")
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
}
