import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavBar from './components/NavBar';

const App = () => {
  const [text, setText] = useState('Click me!');

  const handlePress = () => {
    setText('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <NavBar></NavBar>
      <Button title={text} onPress={handlePress} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
