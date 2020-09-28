import { Router } from "express";

import CryptoCurrencyController from "@app/controllers/CryptoCurrencyController";
import TopCryptoCurrencyController from "@app/controllers/TopCryptoCurrencyController";
import PriceHistoryCryptoCurrencyController from "@app/controllers/PriceHistoryCryptoCurrencyController";
import cacheControl from "../middlewares/cacheControl";

const cryptoCurrencyController = new CryptoCurrencyController();
const topCryptoCurrencyController = new TopCryptoCurrencyController();
const priceHistoryCryptoCurrencyController = new PriceHistoryCryptoCurrencyController();

const routes = Router();

routes.use(cacheControl);

routes.get("/", cryptoCurrencyController.index);
routes.get("/top", topCryptoCurrencyController.index);
routes.get("/history/:symbol", priceHistoryCryptoCurrencyController.show);

export default routes;
