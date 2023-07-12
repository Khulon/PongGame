import React from 'react';
import { View, Text } from 'react-native';
import Game from './components/Game';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Game />
    </View>
  );
};

export default App;