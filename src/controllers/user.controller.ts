import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "src/services/user.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/users")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
