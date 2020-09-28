import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;

  flex: 1;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalBox = styled.View`
  padding: 16px;
  padding-top: 36px;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 200px;

  background: #f5f5f5;
  border-top-right-radius: 36px;
  border-top-left-radius: 36px;
`;

export const ModalTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 36px;
`;

export const ModalTitle = styled.Text`
  font-size: 24px;
`;

export const ModalCloseButton = styled.TouchableOpacity`
  align-items: flex-end;
  justify-content: center;
`;
