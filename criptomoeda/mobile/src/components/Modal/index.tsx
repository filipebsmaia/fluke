import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  ModalBox,
  ModalTitleContainer,
  ModalTitle,
  ModalCloseButton,
} from './styles';

interface ModalProps {
  title: string;
  loading?: boolean;
  onPressCloseButton: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  loading = false,
  onPressCloseButton,
  children,
}) => {
  return (
    <Container>
      <ModalBox>
        <ModalTitleContainer>
          {title && <ModalTitle>{title}</ModalTitle>}
          <ModalCloseButton onPress={onPressCloseButton}>
            <Icon name="x" size={28} color="#161616"></Icon>
          </ModalCloseButton>
        </ModalTitleContainer>
        {loading ? (
          <ActivityIndicator size="large" color="#00C3FF"></ActivityIndicator>
        ) : (
          children
        )}
      </ModalBox>
    </Container>
  );
};

export default Modal;
