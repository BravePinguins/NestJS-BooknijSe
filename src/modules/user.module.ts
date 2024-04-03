import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserController } from "src/controllers/user.controller";
import { User } from "src/models/user.model";
import { UserService } from "src/services/user.service";
import { HashService } from "../services/hash.service";

@Module({
  providers: [UserService, HashService],
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
