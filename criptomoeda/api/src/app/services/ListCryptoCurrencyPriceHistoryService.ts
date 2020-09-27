import AppError from "@app/errors/AppError";
import api from "services/api";
import { save, recover } from "../providers/CacheProvider";

interface IRequest {
  symbol: string;
}

interface IResponse {
  startDate: number;
  endDate: number;
  data: [
    {
      time: number;
      high: number;
      low: number;
      open: number;
      volumefrom: number;
      volumeto: number;
      close: number;
    }
  ];
}

interface IListCryptoCurrencyPriceHistoryRequest {
  Data: {
    TimeFrom: number;
    TimeTo: number;
    Data: [
      {
        time: number;
        high: number;
        low: number;
        open: number;
        volumefrom: number;
        volumeto: number;
        close: number;
      }
    ];
  };
}

class ListCryptoCurrencyPriceHistoryService {
  public async execute({ symbol }: IRequest): Promise<IResponse> {
    let history = await recover<IResponse>(
      `cryptocurrency:history:${symbol.toUpperCase()}`
    );

    if (!history) {
      const {
        data: { Data: data },
      } = await api.get<IListCryptoCurrencyPriceHistoryRequest>(
        `v2/histoday?fsym=${symbol}&tsym=BRL&limit=10`
      );

      if (!data.Data) {
        throw new AppError("Invalid symbol");
      }

      history = {
        startDate: data.TimeFrom,
        endDate: data.TimeTo,
        data: data.Data,
      };

      save({
        key: `cryptocurrency:history:${symbol.toUpperCase()}`,
        value: history,
        expires: 60 * 30,
      });
    }

    return history;
  }
}

export default ListCryptoCurrencyPriceHistoryService;
