import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 8px;
  margin-bottom: 32px;
  flex-direction: row;
  align-items: center;

  background: #f5f5f5;
  border-color: #f5f5f5;
  border-width: 2px;
  border-bottom-color: #888380;

  ${(props) =>
    props.isErrored &&
    css`
      border-bottom-color: #db2828;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-color: #0ef500;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #818181;
  font-size: 20px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
