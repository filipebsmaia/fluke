import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import Input from '../../components/Input';
import Coin from '../../components/Coin';
import Modal from '../../components/Modal';

import {
  TopCoinList,
  Header,
  HeaderSearchContainer,
  Title,
  SearchedCoinList,
} from './styles';

export interface TopCurrencyProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market: string;

  price: number;
  serializedPrice: string;
  status: string;
  raisingPrice: boolean;

  openDay: number;
}

export interface SearchCurrencyProps {
  name: string;
  symbol: string;
  image: string;
  market: string;

  price: number;
  serializedPrice: string;
  status: string;
  raisingPrice: boolean;

  openDay: number;
}

interface SearchCoinFromData {
  coinname: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [topCurrency, setTopCurrency] = useState<TopCurrencyProps[]>([]);
  const [searchModalOppened, setSearchModalOppened] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [searchedCurrency, setSearchedCurrency] = useState<
    SearchCurrencyProps[]
  >([]);

  const {navigate} = useNavigation();

  useEffect(() => {
    api.get<TopCurrencyProps[]>('cryptocurrency/top').then((response) => {
      setTopCurrency(
        response.data.map((currency) => {
          const {price, openDay} = currency;
          const status = currency.price / currency.openDay;

          return {
            ...currency,
            serializedPrice: `R$ ${currency.price
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
            status: `${status.toFixed(2)}%`,
            raisingPrice: status > 0,
          };
        }),
      );
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSearchModalOppened(false);
  }, []);

  const handleSearchCoin = useCallback(async (data: SearchCoinFromData) => {
    try {
      const schema = Yup.object().shape({
        coinname: Yup.string()
          .required('O nome da moeda é obrigatorio')
          .min(2, 'Mínimo de 2 caracteres para o nome da moeda'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);
      setSearchModalOppened(true);
      await api
        .get<SearchCurrencyProps[]>(`cryptocurrency?name=${data.coinname}`)
        .then((response) => {
          setSearchedCurrency(
            response.data.map((currency) => {
              const {price, openDay} = currency;
              const status = currency.price / currency.openDay;

              return {
                ...currency,
                serializedPrice: `R$ ${currency.price
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
                status: `${status.toFixed(2)}%`,
                raisingPrice: status > 0,
              };
            }),
          );
        });
      setLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(
        'Falha ao pesquisar moeda',
        'Ocorreu um erro ao fazer sua solicitação, tente novamente.',
      );
    }
  }, []);

  const navigateToCurrencyInfo = useCallback(
    (currencySymbol: string, currencyName: string) => {
      navigate('CurrencyInfo', {currencySymbol, currencyName});
    },
    [navigate],
  );

  return (
    <>
      <Header>
        <Title>Dashboard</Title>
        <HeaderSearchContainer>
          <Form ref={formRef} onSubmit={handleSearchCoin}>
            <Input
              name="coinname"
              icon="search"
              placeholder="Pequise uma moeda"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            ></Input>
          </Form>
        </HeaderSearchContainer>
      </Header>
      <TopCoinList
        data={topCurrency}
        keyExtractor={(currency) => currency.id}
        ListHeaderComponent={<Title>TopList</Title>}
        showsVerticalScrollIndicator={false}
        renderItem={({item: coin}) => (
          <Coin
            coinData={coin}
            onPress={() => navigateToCurrencyInfo(coin.symbol, coin.name)}
          />
        )}
      />
      {searchModalOppened && (
        <Modal
          title="Resultado da pequisa"
          onPressCloseButton={handleCloseModal}
          loading={loading}
        >
          <SearchedCoinList
            data={searchedCurrency}
            keyExtractor={(currency) => currency.symbol}
            showsVerticalScrollIndicator={false}
            renderItem={({item: coin}) => (
              <Coin
                coinData={coin}
                onPress={() => navigateToCurrencyInfo(coin.symbol, coin.name)}
              />
            )}
          />
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
