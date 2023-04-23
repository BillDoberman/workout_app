import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

const NavBar = () => {
  const [text, setText] = useState('Click me!');

  const handlePress = () => {
    setText('Button pressed!');
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Button title="Button 1" style={styles.button} onPress={handlePress} />
      <Button title="Button 2" style={styles.button}/>
      <Button title="Button 3" style={styles.button}/>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 50,
    height: 60,
    width: 200,
    backgroundColor: 'black'
  }
});

export default NavBar;

