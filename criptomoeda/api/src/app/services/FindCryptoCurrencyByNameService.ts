import api from "services/api";
import { save, recover } from "../providers/CacheProvider";

interface IRequest {
  name: string;
}

type IResponse = Array<{
  name: string;
  symbol: string;
  image: string;
  market: string;
  price: number;
  lastUpdate: number;
  median: number;
  openDay: number;
  highDay: number;
  lowDay: number;
  high24hour: number;
  low24hour: number;
}>;

interface ICoinPricingInfoRequest {
  RAW: {
    [symbol: string]: {
      BRL: {
        FROMSYMBOL: string;
        MARKET: string;
        PRICE: number;
        LASTUPDATE: number;
        MEDIAN: number;
        OPENDAY: number;
        HIGHDAY: number;
        LOWDAY: number;
        HIGH24HOUR: number;
        LOW24HOUR: number;
        IMAGEURL: string;
      };
    };
  };
}

interface ICoinList {
  Id: number;
  ImageUrl: string;
  Symbol: string;
  FullName: string;
}

interface ICoinListRequest {
  Data: {
    [name: string]: ICoinList;
  };
}

class FindCoinsByNameService {
  public async execute({ name }: IRequest): Promise<IResponse> {
    let allCoins = await recover<ICoinList[]>("cryptocurrency:list");

    if (!allCoins) {
      const {
        data: { Data: allCoinsData },
      } = await api.get<ICoinListRequest>(`all/coinlist?summary=true`);

      allCoins = Object.entries(allCoinsData)
        .map(([_, coin]) => {
          return coin;
        })
        .sort((a, b) => a.FullName.length - b.FullName.length)
        .sort((a, b) => a.Id - b.Id);

      save({ key: "cryptocurrency:list", value: allCoins, expires: 60 * 30 });
    }

    const filteredCoins = allCoins.filter((coin) =>
      coin.FullName.toLowerCase().includes(name.toLowerCase())
    );

    const symbolsToQueryParams = filteredCoins
      .map((coin) => coin.Symbol)
      .join(",");

    const {
      data: { RAW: pricingData },
    } = await api.get<ICoinPricingInfoRequest>(
      `pricemultifull?tsyms=BRL&fsyms=${symbolsToQueryParams}`
    );
    console.log(symbolsToQueryParams);

    const coins = Object.entries(pricingData).map(([symbol, coin]) => {
      const rawCoinInfo = coin.BRL;
      return {
        symbol,
        image: `https://www.cryptocompare.com/${rawCoinInfo.IMAGEURL}`,
        market: rawCoinInfo.MARKET,
        price: rawCoinInfo.PRICE,
        lastUpdate: rawCoinInfo.LASTUPDATE,
        median: rawCoinInfo.MEDIAN,
        openDay: rawCoinInfo.OPENDAY,
        highDay: rawCoinInfo.HIGHDAY,
        lowDay: rawCoinInfo.LOWDAY,
        high24hour: rawCoinInfo.HIGH24HOUR,
        low24hour: rawCoinInfo.LOW24HOUR,
      };
    });

    const serializedCoins = coins.map((coin) => {
      const coinInfo = filteredCoins.find(
        (filteredCoin) => filteredCoin.Symbol === coin.symbol
      );

      return { name: coinInfo?.FullName || coin.symbol, ...coin };
    });

    return serializedCoins;
  }
}

export default FindCoinsByNameService;
