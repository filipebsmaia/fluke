import {Platform} from 'react-native';
import styled, {css} from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 80 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 600;
  margin: 64px 0 24px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  border-top-width: 1px;
  border-color: #888380;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #161616;
  font-size: 18px;
  margin-left: 16px;
`;
