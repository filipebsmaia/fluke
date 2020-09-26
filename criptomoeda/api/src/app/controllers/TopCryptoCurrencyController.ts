import { Request, Response } from "express";
import db from "@config/database";
import ListTopCryptoCurrencyService from "@app/services/ListTopCryptoCurrencyService";

class TopCryptoCurrencyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTopCryptoCurrencyService = new ListTopCryptoCurrencyService();
    const topCryptoCurrencyList = await listTopCryptoCurrencyService.execute(
      {}
    );
    return response.json(topCryptoCurrencyList);
  }
}

export default TopCryptoCurrencyController;
