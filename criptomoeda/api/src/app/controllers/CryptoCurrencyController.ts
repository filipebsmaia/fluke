import { Request, Response } from "express";
import db from "@config/database";
import FindCryptoCurrencyByNameService from "@app/services/FindCryptoCurrencyByNameService";

class CryptoCurrencyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const findCryptoCurrencyByNameService = new FindCryptoCurrencyByNameService();
    const currencies = await findCryptoCurrencyByNameService.execute({
      name: String(name),
    });
    return response.json(currencies);
  }
}

export default CryptoCurrencyController;
