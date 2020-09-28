import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const CoinContainer = styled(RectButton)`
  flex-direction: row;
  justify-content: space-between;

  padding: 8px 0px;

  border-bottom-width: 1px;
  border-bottom-color: #888380;
`;
export const CoinImageBox = styled.View`
  flex-direction: row;
`;

const CoinBox = styled.View`
  justify-content: center;
  padding: 0 8px;
`;

export const CoinNameBox = styled(CoinBox)`
  align-items: flex-start;
`;

export const CoinPriceBox = styled(CoinBox)`
  align-items: flex-end;
`;

export const CoinImage = styled.Image`
  height: 64px;
  width: 64px;
  border-radius: 32px;
`;

export const CoinText = styled.Text`
  font-size: 18px;
`;

export const CoinStatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
