import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useParams } from 'react-router-dom';
import Game from './components/Game';
import axios from 'axios';

const Test = () => {
  const { chatId, userId } = useParams();
  const [ score, setScore ] = useState(0);

  const sendGameScoreToTelegram = async () => {
    console.log('hello')
    try {
      const payload = {
        chat_id: chatId,
        text: `Game score: ${score}`,
      };
      const response = await axios.post(`https://api.telegram.org/bot6051468752:AAGS30iFWpUEi8EAojbRXRDlyWNu6O4zhQg/sendMessage`, payload);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', height: '50px', width: '100%', borderWidth:'1px', borderColor:'white', zIndex:99}}>
        <Text style={{color:'white'}}>chatIdd: {chatId}</Text>
        <Text style={{color:'white'}} >userId: {userId}</Text>
        <Text style={{color:'white'}} >score: {score}</Text>
        <TouchableOpacity style={{width:'50px', height:'30px', borderWidth:'1px', backgroundColor:'white', opacity:0.5}} onPress={()=> setScore(score+1)}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'50px', height:'30px', borderWidth:'1px', backgroundColor:'white', opacity:0.5}} onPress={sendGameScoreToTelegram}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
      <Game/>
    </View>
  );
};

export default Test;