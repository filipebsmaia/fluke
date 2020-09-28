import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Header = styled.View`
  margin: 24px;
  margin-top: ${getStatusBarHeight()}px;
  margin-bottom: 0px;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.Text`
  color: #161616;
  font-size: 28px;
  font-weight: 600;
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 24px;
`;
export const BackText = styled.Text`
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const Content = styled.View`
  margin: 24px;
`;

export const HistoricTitle = styled.Text`
  font-size: 22px;
  text-align: center;
`;

export const HistoricContainer = styled.View`
  margin-bottom: 16px;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #888380;
`;

export const HistoricText = styled.Text`
  font-size: 18px;
  color: #161616;
`;
export const HistoricContent = styled.View``;
export const HistoricBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;
