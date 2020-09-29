import { Router } from "express";
import UserController from "@app/controllers/UserController";
import SessionsController from "@app/controllers/SessionsController";

const userController = new UserController();
const sessionsController = new SessionsController();

const routes = Router();

routes.post("/", userController.create);

routes.post("/sessions", sessionsController.create);

export default routes;
