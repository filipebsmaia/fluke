import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import UserController from "@app/controllers/UserController";
import SessionsController from "@app/controllers/SessionsController";

const userController = new UserController();
const sessionsController = new SessionsController();

const routes = Router();

routes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

routes.post("/sessions", sessionsController.create);

export default routes;
