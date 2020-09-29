import api from "../../services/api";

type IResponse = {};

interface ITopCurrencyRequest {
  Data: [
    {
      CoinInfo: {
        Id: string;
        Name: string;
        FullName: string;
        ImageUrl: string;
        Rating: {
          Weiss: {
            Rating: string;
            TechnologyAdoptionRating: string;
            MarketPerformanceRating: string;
          };
        };
        NetHashesPerSecond: number;
        BlockNumber: number;
        BlockTime: number;
        BlockReward: number;
      };
      RAW: {
        BRL: {
          MARKET: string;
          PRICE: number;
          LASTUPDATE: number;
          MEDIAN: number;
          OPENDAY: number;
          HIGHDAY: number;
          LOWDAY: number;
          HIGH24HOUR: number;
          LOW24HOUR: number;
        };
      };
    }
  ];
}

class ListTopCryptoCurrencyService {
  public async execute({}): Promise<IResponse> {
    const { data } = await api.get<ITopCurrencyRequest>(
      "top/totalvolfull?tsym=BRL"
    ); // chache this

    const currencies = data.Data.map((coin) => {
      const info = coin.CoinInfo;
      const raw = coin.RAW.BRL;
      return {
        id: info.Id,
        name: info.FullName,
        symbol: info.Name,
        image: `https://www.cryptocompare.com/${info.ImageUrl}`,
        rating: {
          rating: info.Rating.Weiss.Rating,
          technologyAdoption: info.Rating.Weiss.TechnologyAdoptionRating,
          marketPerformance: info.Rating.Weiss.MarketPerformanceRating,
        },
        hashesPerSecond: info.NetHashesPerSecond,
        blockNumber: info.BlockNumber,
        blockTime: info.BlockTime,
        blockReward: info.BlockReward,

        market: raw.MARKET,
        price: raw.PRICE,
        lastUpdate: raw.LASTUPDATE,
        median: raw.MEDIAN,
        openDay: raw.OPENDAY,
        highDay: raw.HIGHDAY,
        lowDay: raw.LOWDAY,
        high24hour: raw.HIGH24HOUR,
        low24hour: raw.LOW24HOUR,
      };
    });

    return currencies;
  }
}

export default ListTopCryptoCurrencyService;
