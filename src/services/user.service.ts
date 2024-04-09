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
    if (await this.getUserByEmail(newUser.email)) {
      return res.json({
        isSuccess: false,
        message: "Taki użytkownik już istnieje!",
      });
    } else if (newUser.password.length < 2) {
      return res.json({
        isSuccess: false,
        message: "Hasło jest za krótkie!",
      });
    } else if (!newUser.email.includes("@")) {
      return res.json({
        isSuccess: false,
        message: "Email ma zły format!",
      });
    } else {
      const hashPwd = await this.hashService.hashData(newUser.password);
      const user = await this.userRepository.create({
        ...newUser,
        password: hashPwd,
      });

      return res.json({ isSuccess: true, user: user.id });
    }
  }
}
