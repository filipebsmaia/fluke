import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {TopCurrencyProps, SearchCurrencyProps} from './index';
import Button from '../../components/Button';

export const Header = styled.View`
  margin: 24px;
  margin-top: ${getStatusBarHeight() + 24}px;
  margin-bottom: 0px;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.Text`
  color: #161616;
  font-size: 28px;
  font-weight: 600;
`;

export const HeaderSearchContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const HeaderSearchButton = styled(Button)`
  width: 120px;
`;

export const TopCoinList = styled(
  FlatList as new () => FlatList<TopCurrencyProps>,
)`
  margin: 0 24px;
`;

export const SearchedCoinList = styled(
  FlatList as new () => FlatList<SearchCurrencyProps>,
)``;
