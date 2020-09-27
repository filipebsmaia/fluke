import React from 'react';
import {ActivityIndicator} from 'react-native';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {Container, ButtonText} from './styles';

interface ButtonProps extends RectButtonProperties {
  color?: string;
  loading?: boolean;
  children: string;
}

const Button: React.FC<ButtonProps> = ({color, loading, children, ...rest}) => {
  return (
    <Container color={color} loading={loading} {...rest}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </Container>
  );
};

export default Button;
