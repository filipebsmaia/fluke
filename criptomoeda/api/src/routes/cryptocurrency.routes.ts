import { Router } from "express";

import CryptoCurrencyController from "@app/controllers/CryptoCurrencyController";
import TopCryptoCurrencyController from "@app/controllers/TopCryptoCurrencyController";
import cacheControl from "../middlewares/cacheControl";

const cryptoCurrencyController = new CryptoCurrencyController();
const topCryptoCurrencyController = new TopCryptoCurrencyController();

const routes = Router();

routes.use(cacheControl);

routes.get("/", cryptoCurrencyController.index);
routes.get("/top", topCryptoCurrencyController.index);

export default routes;
