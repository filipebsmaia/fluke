import { Request, Response } from "express";

import AuthenticateUserService from "../services/AuthenticateUserSerivce";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    delete user.password;
    return response.json({ user, token });
  }
}
