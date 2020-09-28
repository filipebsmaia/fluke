import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View} from 'react-native';

import {
  CoinContainer,
  CoinImageBox,
  CoinNameBox,
  CoinPriceBox,
  CoinImage,
  CoinText,
  CoinStatusContainer,
} from './styles';

interface CoinProps {
  coinData: {
    name: string;
    symbol: string;
    image: string;

    price: number;
    serializedPrice: string;
    status: string;
    raisingPrice: boolean;
  };
  onPress: () => void;
}

const Coin: React.FC<CoinProps> = ({coinData, onPress}) => {
  return (
    <CoinContainer onPress={onPress}>
      <CoinImageBox>
        <CoinImage source={{uri: coinData.image}} />
        <CoinNameBox>
          <CoinText>{coinData.name}</CoinText>
          <CoinText>{coinData.symbol}</CoinText>
        </CoinNameBox>
      </CoinImageBox>
      <CoinPriceBox>
        <CoinText>{coinData.serializedPrice}</CoinText>
        <CoinStatusContainer>
          {
            <Icon
              name={coinData.raisingPrice ? 'chevron-up' : 'chevron-down'}
              color={coinData.raisingPrice ? '#0ef500' : '#db2828'}
              size={24}
            />
          }
          <CoinText>{coinData.status}</CoinText>
        </CoinStatusContainer>
      </CoinPriceBox>
    </CoinContainer>
  );
};

export default Coin;
