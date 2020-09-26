import { Router } from "express";
import usersRouter from "./users.routes";
import cryptocurrencyRouter from "./cryptocurrency.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/cryptocurrency", cryptocurrencyRouter);

export default routes;
