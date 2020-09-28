import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {LineChart} from 'react-native-chart-kit';
import {toDate, format} from 'date-fns';

import {useRoute, useNavigation} from '@react-navigation/native';
import api from '../../services/api';

import {
  Header,
  Title,
  BackText,
  BackButton,
  Content,
  HistoricContainer,
  HistoricText,
  HistoricContent,
  HistoricBox,
  HistoricTitle,
} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

interface RouteParams {
  currencySymbol: string;
  currencyName: string;
}

interface PriceHistoricRequest {
  data: [
    {
      time: number;
      high: number;
      low: number;
      open: number;
      close: number;
    },
  ];
}

interface Historic {
  day: string;
  dayFull: string;
  price: number;
  formattedPrice: string;
  formattedHigh: string;
  formattedLow: string;
  formattedOpen: string;
}

const CurrencyInfo: React.FC = () => {
  const {goBack} = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState(
    routeParams.currencySymbol,
  );
  const [selectedName, setSelectedName] = useState(routeParams.currencyName);

  const [coinsHistoric, setCoinsHistoric] = useState<Historic[]>([]);

  useEffect(() => {
    setLoading(true);
    api
      .get<PriceHistoricRequest>(`cryptocurrency/history/${selectedSymbol}`)
      .then((response) => {
        const formatNumber = (number: number): string => {
          return `R$ ${number
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
        };

        const serializedData = response.data.data.map((historic) => {
          return {
            day: format(toDate(historic.time * 1000), 'dd/MM'),
            dayFull: format(toDate(historic.time * 1000), 'dd/MM/yyyy'),
            price: historic.close,
            formattedPrice: formatNumber(historic.close),
            formattedHigh: formatNumber(historic.high),
            formattedLow: formatNumber(historic.low),
            formattedOpen: formatNumber(historic.open),
          };
        });

        setCoinsHistoric(serializedData);
        setLoading(false);
      });
  }, [selectedSymbol]);

  const historicDays = useMemo(() => coinsHistoric.map((data) => data.day), [
    coinsHistoric,
  ]);

  const historicValues = useMemo(
    () => coinsHistoric.map((data) => data.price),
    [coinsHistoric],
  );

  const navigateBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <SafeAreaView>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24}></Icon>
          <BackText>Voltar</BackText>
        </BackButton>
        <Title>
          {selectedName} - {selectedSymbol}
        </Title>
      </Header>
      <Content>
        {loading ? (
          <ActivityIndicator size="large" color="#00C3FF" />
        ) : (
          <LineChart
            data={{
              labels: historicDays,
              datasets: [
                {
                  data: historicValues,
                },
              ],
            }}
            width={Dimensions.get('window').width - 48} // from react-native
            height={220}
            yAxisLabel="R$"
            yAxisInterval={1} // optional, defaults to 1
            verticalLabelRotation={-45}
            horizontalLabelRotation={-45}
            chartConfig={{
              backgroundColor: '#e5e5e5',
              backgroundGradientFrom: '#e5e5e5',
              backgroundGradientTo: '#e5e5e5',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(22, 22, 22, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(22, 22, 22, ${opacity})`,

              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#f5f5f5',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 8,
            }}
          />
        )}
        <FlatList
          data={coinsHistoric}
          keyExtractor={(historic) => historic.day}
          showsVerticalScrollIndicator={false}
          renderItem={({item: history}) => (
            <HistoricContainer>
              <HistoricTitle>{history.dayFull}</HistoricTitle>
              <HistoricContent>
                <HistoricBox>
                  <View>
                    <HistoricText>Abertura</HistoricText>
                    <HistoricText>{history.formattedOpen}</HistoricText>
                  </View>
                  <View>
                    <HistoricText>Fechamento</HistoricText>
                    <HistoricText>{history.formattedPrice}</HistoricText>
                  </View>
                </HistoricBox>
                <HistoricBox>
                  <View>
                    <HistoricText>Alta</HistoricText>
                    <HistoricText>{history.formattedHigh}</HistoricText>
                  </View>
                  <View>
                    <HistoricText>Baixa</HistoricText>
                    <HistoricText>{history.formattedLow}</HistoricText>
                  </View>
                </HistoricBox>
              </HistoricContent>
            </HistoricContainer>
          )}
        ></FlatList>
      </Content>
    </SafeAreaView>
  );
};

export default CurrencyInfo;
