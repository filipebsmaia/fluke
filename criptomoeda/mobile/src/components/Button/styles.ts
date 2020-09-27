import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface ButtonProps {
  color?: string;
  loading?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  height: 60px;
  background: ${(props) => (props.color ? props.color : '#0ef500')};
  opacity: ${(props) => (props.loading ? 0.5 : 1)};
  border-radius: 30px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
  font-size: 20px;
`;
