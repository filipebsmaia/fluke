import React, {useRef, useCallback, useState} from 'react';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import {useAuth} from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import Input from '../../components/Input';
import logoImage from '../../assets/logo.png';

import {Container, Title, SignUpButton, SignUpButtonText} from './styles';

import Button from '../../components/Button';
import api from '../../services/api';

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória')
          .min(6, 'No minimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      Alert.alert(
        'Cadastro realizado com sucess',
        'Você já pode fazer seu login!',
      );

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente.',
      );
    }
    setLoading(false);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}
        >
          <Container>
            <Image source={logoImage} />
            <Title>Faça seu cadastro</Title>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Usuário"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                secureTextEntry
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button
              onPress={() => formRef.current?.submitForm()}
              style={{marginTop: 40}}
              loading={loading}
            >
              Cadastrar
            </Button>
          </Container>
          <SignUpButton onPress={() => navigation.goBack()}>
            <Icon name="log-in" size={20} color="#161616" />
            <SignUpButtonText>Fazer login</SignUpButtonText>
          </SignUpButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
