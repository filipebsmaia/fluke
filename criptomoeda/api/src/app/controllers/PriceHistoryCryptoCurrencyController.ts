import { Request, Response } from "express";
import db from "@config/database";
import ListCryptoCurrencyPriceHistoryService from "@app/services/ListCryptoCurrencyPriceHistoryService";

class PriceHistoryCryptoCurrencyController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { symbol } = request.params;
    const listCryptoCurrencyPriceHistoryService = new ListCryptoCurrencyPriceHistoryService();
    const history = await listCryptoCurrencyPriceHistoryService.execute({
      symbol,
    });
    return response.json(history);
  }
}

export default PriceHistoryCryptoCurrencyController;
