import React from 'react';
import { View } from 'react-native';

const Paddle = ({ position }) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: 70,
        height: 10,
        backgroundColor: 'white',
        left: position - 35,
        justifyContent:'center',
        alignItems:'center'
      }}
    />
  );
};

export default Paddle;