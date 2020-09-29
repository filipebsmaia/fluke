import React, {useRef, useCallback} from 'react';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import {useAuth} from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import Input from '../../components/Input';
import logoImage from '../../assets/logo.png';

import {Container, Title, SignInButton, SignInButtonText} from './styles';

import Button from '../../components/Button';

interface SingInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const {singIn, loading} = useAuth();

  const handleSignIn = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('O email é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('A senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await singIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Falha na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [singIn],
  );

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
            <Title>Faça seu login</Title>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="user"
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
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <SignInButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#161616" />
        <SignInButtonText>Criar uma conta</SignInButtonText>
      </SignInButton>
    </>
  );
};

export default SignIn;
