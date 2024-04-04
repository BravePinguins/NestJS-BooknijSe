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
    } else {
      const hashPwd = this.hashService.hashData(newUser.password);
      const user = new User();
      user.email = newUser.email;
      user.firstName = newUser.firstName;
      user.lastName = newUser.lastName;
      user.password = await hashPwd;
      user.currentTokenId = newUser.currentTokenId;
      user.role = newUser.role;
      await user.save();

      return res.json({ isSuccess: true, user: user.id });
    }
  }
}
