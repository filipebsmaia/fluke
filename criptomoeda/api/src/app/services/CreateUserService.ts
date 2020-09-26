import db from "@config/database";
import AppError from "@app/errors/AppError";
import { generateHash } from "@app/providers/HashProvider";
import User from "../models/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

type IResponse = User;

class CreateUserSerivce {
  public async execute({
    name,
    password,
    email,
  }: IRequest): Promise<IResponse> {
    const usersCollection = db.collection("users");
    const { empty: userNotExists } = await usersCollection
      .where("email", "==", email)
      .get();

    if (!userNotExists) {
      throw new AppError("Email already used");
    }

    const hashedPassowrd = await generateHash(password);

    const user: User = {
      name,
      email,
      password: hashedPassowrd,
    };

    await usersCollection.doc().set(user);

    return user;
  }
}

export default CreateUserSerivce;
