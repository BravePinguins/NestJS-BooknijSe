import { Injectable } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import { JwtPayload } from "../common/utils/jwt.strategy";
import { AuthLoginDto } from "../models/dto/auth/auth-login.dto";
import { HashService } from "./hash.service";
import * as process from "process";
import { UserService } from "./user.service";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private userService: UserService
  ) {}
  public createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, process.env.JWT_SECRET, { expiresIn });
    return {
      accessToken,
      expiresIn,
    };
  }

  async login(req: AuthLoginDto, res: Response) {
    try {
      if (!req.email.includes("@")) {
        return res.json({
          isSuccess: false,
          message: "Błędny e-mail.",
        });
      }

      if (req.password.length < 2) {
        return res.json({
          isSuccess: false,
          message: "Hasło nie może być mniejsze od dwóch znaków.",
        });
      }

      const user = await this.userService.getUserByEmail(req.email);
      console.log(user);
      if (!user) {
        return res.json({
          isSuccess: false,
          message: "Niepoprawne dane logowania!",
        });
      }

      const password = await this.hashService.hashCompare(
        req.password,
        user.password
      );
      if (!password) {
        return res.json({
          isSuccess: false,
          message: "Niepoprawne dane logowania!",
        });
      }

      const token = this.createToken(
        await this.userService.generateToken(user)
      );

      return res
        .cookie("jwt", token.accessToken, {
          secure: true,
          domain: "localhost:3000",
          httpOnly: true,
        })
        .json({
          isSuccess: true,
          userId: user.id,
          userRole: user.role,
        });
    } catch (e) {
      return res.json({
        isSuccess: false,
        message: e.message,
      });
    }
  }

  async logout(user: User, res: Response): Promise<any> {
    console.log(user);
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie("jwt", {
        secure: true,
        domain: "127.0.0.1",
        httpOnly: true,
      });
      return res.json({ message: "logout" });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
