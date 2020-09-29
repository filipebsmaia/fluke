import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import CryptoCurrencyController from "@app/controllers/CryptoCurrencyController";
import TopCryptoCurrencyController from "@app/controllers/TopCryptoCurrencyController";
import PriceHistoryCryptoCurrencyController from "@app/controllers/PriceHistoryCryptoCurrencyController";
import cacheControl from "../middlewares/cacheControl";

const cryptoCurrencyController = new CryptoCurrencyController();
const topCryptoCurrencyController = new TopCryptoCurrencyController();
const priceHistoryCryptoCurrencyController = new PriceHistoryCryptoCurrencyController();

const routes = Router();

routes.use(cacheControl);

routes.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
    },
  }),
  cryptoCurrencyController.index
);
routes.get("/top", topCryptoCurrencyController.index);
routes.get(
  "/history/:symbol",
  celebrate({
    [Segments.PARAMS]: {
      symbol: Joi.string().required(),
    },
  }),
  priceHistoryCryptoCurrencyController.show
);

export default routes;
