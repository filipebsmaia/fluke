import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <View style={{flex: 1, backgroundColor: '#F5F5F5'}} />
    </NavigationContainer>
  );
};

export default App;
