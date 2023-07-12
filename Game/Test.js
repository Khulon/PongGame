import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useParams } from 'react-router-dom';
import Game from './components/Game';
import axios from 'axios';

const Test = () => {
  const { chatId, userId, messageId, inlineMessageId } = useParams();
  const [ score, setScore ] = useState(0);

  const sendGameScoreToTelegram = async () => {
    if (chatId=='null' || messageId=='null') {
      console.log('sdds')
      try {
        console.log(userId)
        const response = await axios.post(`https://api.telegram.org/bot6051468752:AAGS30iFWpUEi8EAojbRXRDlyWNu6O4zhQg/setGameScore`, {
          inline_message_id: inlineMessageId,
          user_id: userId,
          score: score,
          force: true, // Optional parameter to overwrite the existing score if applicable
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post(`https://api.telegram.org/bot6051468752:AAGS30iFWpUEi8EAojbRXRDlyWNu6O4zhQg/setGameScore`, {
          chat_id: chatId,
          user_id: userId,
          message_id: messageId,
          score: score,
          force: true, // Optional parameter to overwrite the existing score if applicable
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', height: '90px', width: '100%', borderWidth:'1px', borderColor:'white', zIndex:99}}>
        <Text style={{color:'white'}}>chatIdd: {chatId}</Text>
        <Text style={{color:'white'}} >userId: {userId}</Text>
        <Text style={{color:'white'}} >messageId: {messageId}</Text>
        <Text style={{color:'white'}} >inlineMessageId: {inlineMessageId}</Text>
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