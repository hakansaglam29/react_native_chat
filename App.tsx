import React, {useEffect, useState} from 'react';
//import axios from 'axios';
import {io} from 'socket.io-client';
import {View, Text, SafeAreaView, Button} from 'react-native';

const App = () => {
  // const fetchData = async () => {
  //   let response = await axios.get('http://localhost:3000');
  //   console.log('response', response.data);
  // };
  const socket = io('http://localhost:3000', {
    transports: ['websocket'],
    forceNew: true,
    upgrade: false,
  });

  const [state, setState] = useState([]);

  const receiveMessage = () => {
    socket.on('msgToClient', ahmet => {
      console.log('ahmet', ahmet);
      setState(ahmet);
    });
  };

  const sendMessage = () => {
    socket.emit('msgToServer', 'at basi');
  };

  const deleteMessage = () => {
    socket.emit('msgToServer', 'delete');
  };

  useEffect(() => {
    receiveMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <View>
        {state.map(item => (
          <Text>{item}</Text>
        ))}
      </View>
      <Button title="Add new lamp" onPress={sendMessage} />
      <Button title="delete lamp" onPress={deleteMessage} />
    </SafeAreaView>
  );
};

export default App;
