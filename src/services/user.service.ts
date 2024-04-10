import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { v4 as uuid } from "uuid";
import { RegisterUserDto } from "../models/dto/register/register-user.dto";
import { Response } from "express";
import { HashService } from "./hash.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private hashService: HashService
  ) {}

  private async registerValidation(user: RegisterUserDto) {
    const errors = [];
    const existingUser = await this.getUserByEmail(user.email);
    if (existingUser) {
      errors.push("Taki użytkownik już istnieje!");
    }

    if (user.password.length < 4) {
      errors.push("Hasło jest za krótkie!");
    }

    if (!user.email.includes("@")) {
      errors.push("Email ma zły format!");
    }

    if (errors.length > 0) {
      return {
        isSuccess: false,
        errors: errors,
      };
    }

    return { isSuccess: true };
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      attributes: ["id", "email", "password"],
    });
  }

  async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await this.userRepository.findOne({
        where: { currentTokenId: token },
      });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();
    return token;
  }

  async register(newUser: RegisterUserDto, res: Response) {
    const validationResult = await this.registerValidation(newUser);

    if (validationResult.isSuccess) {
      const hashPwd = await this.hashService.hashData(newUser.password);
      const user = await this.userRepository.create({
        ...newUser,
        password: hashPwd,
      });

      return res.json({ isSuccess: true, user: user.id });
    } else {
      return res.json({
        isSuccess: false,
        errors: validationResult.errors,
      });
    }
  }
}
