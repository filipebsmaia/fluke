import db from "@config/database";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@app/errors/AppError";
import { compareHash } from "../providers/HashProvider";
import User from "../models/User";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserSerivce {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersCollection = db.collection("users");
    const { empty: userNotExists, docs: users } = await usersCollection
      .where("email", "==", email)
      .get();

    if (userNotExists) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const user = Object.assign(users[0].data() as User, { id: users[0].id });

    const passwordMathced = await compareHash(password, user.password);

    if (!passwordMathced) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserSerivce;
