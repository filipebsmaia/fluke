import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import CurrencyInfo from '../pages/CurrencyInfo';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#F5F5F5'},
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="CurrencyInfo" component={CurrencyInfo} />
    </App.Navigator>
  );
};

export default AppRoutes;
