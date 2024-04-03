import * as crypto from "crypto";

export const randomSalt = (size: number) => {
  const salt = crypto.randomBytes(size);
  return salt.toString();
};
