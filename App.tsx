import React, {useEffect} from 'react';
import axios from 'axios';
import {View, Text} from 'react-native';

const App = () => {
  const fetchData = async () => {
    let response = await axios.get('http://localhost:3000');
    console.log('response', response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text />
    </View>
  );
};

export default App;
