import React, {useEffect, useState} from 'react';
//import axios from 'axios';
import {io} from 'socket.io-client';
import {View, Text, SafeAreaView, Button} from 'react-native';

const App = () => {
  // const fetchData = async () => {
  //   let response = await axios.get('http://localhost:3000');
  //   console.log('response', response.data);
  // };
  const socket = io('http://192.168.2.140:3000', {
    transports: ['websocket'],
    forceNew: true,
    upgrade: false,
  });

  const [state, setState] = useState([]);

  const receiveMessage = () => {
    socket.on('msgToClient', message => {
      setState(message);
    });
  };

  const sendMessage = () => {
    socket.emit('msgToServer', 'Lamp');
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
        {state.map((item, index) => (
          <Text key={index} style={{textAlign: 'center', padding: 5}}>
            {item}
          </Text>
        ))}
      </View>
      <Button title="Add new lamp" onPress={sendMessage} />
      <Button title="delete lamp" onPress={deleteMessage} />
    </SafeAreaView>
  );
};

export default App;
