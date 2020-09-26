import { hash, compare } from "bcryptjs";

export async function generateHash(payload: string): Promise<string> {
  return hash(payload, 8);
}

export async function compareHash(
  payload: string,
  hashed: string | undefined
): Promise<boolean> {
  return compare(payload, hashed || "");
}
