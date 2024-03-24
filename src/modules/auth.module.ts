import { Module } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { JwtStrategy } from "../common/utils/jwt.strategy";
import { HashService } from "../services/hash.service";
import { UserService } from "../services/user.service";
import { UserModule } from "./user.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../models/user.model";

@Module({
  controllers: [AuthController],
  imports: [SequelizeModule.forFeature([User]), UserModule],
  providers: [AuthService, JwtStrategy, HashService, UserService],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
