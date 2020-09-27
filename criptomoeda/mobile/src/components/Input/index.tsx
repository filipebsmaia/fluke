import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';

import {TextInputProps} from 'react-native';

import {useField} from '@unform/core';

import {Container, TextInput, Icon} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {name, icon, containerStyle = {}, ...rest},
  ref,
) => {
  const {registerField, defaultValue, fieldName, error} = useField(name);

  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showErrorColor, setShowErrorColor] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    setShowErrorColor(false);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    setShowErrorColor(true);
  }, [error]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error} style={containerStyle}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#0ef500' : '#888380'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="light"
        // @ts-ignore
        placeholderTextColor="#888380"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />

      {!!error && showErrorColor && (
        <Icon name="info" size={20} color="#db2828" />
      )}
    </Container>
  );
};

export default forwardRef(Input);
