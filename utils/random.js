import { randomBytes } from "crypto";

export function generateRandomBytes(size) {
  return randomBytes(size);
}
