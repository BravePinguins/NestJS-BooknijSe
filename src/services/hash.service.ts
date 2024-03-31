import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@Injectable()
export class HashService {
  async hashData(data: string) {
    return await bcrypt.hash(data, Number(process.env.BCRYPT_SALT_ROUND));
  }

  async hashCompare(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }
}
