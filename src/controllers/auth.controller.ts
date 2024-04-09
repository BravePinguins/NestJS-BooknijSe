import { Controller, Post, Body, Get, Res } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthLoginDto } from "../models/dto/auth/auth-login.dto";
import { User } from "../models/user.model";
import { UserObj } from "../common/decorators/user-obj.decorator";
import { Response } from "express";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @ApiOperation({
    summary: "User Login",
  })
  @ApiBody({ type: AuthLoginDto })
  async login(@Body() req: AuthLoginDto, @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }
  @Get("/logout")
  @ApiOperation({
    summary: "User logout",
  })
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
}
