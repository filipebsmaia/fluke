import { Request, Response } from "express";
import db from "@config/database";

import CreateUserSerivce from "../services/CreateUserService";

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserSerivce();
    const user = await createUserService.execute({ name, email, password });

    delete user.password;
    return response.json(user);
  }
}

export default UserController;
