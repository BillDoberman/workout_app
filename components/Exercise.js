import { React, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, Text } from 'react-native';

function Exercise({ navigation }) {
  return (
    <View >
      <Text>hello</Text>
    </View>
  );
}

export default Exercise;

const styles = StyleSheet.create({
  file_system_button_bar: {
    flex: 1,
    maxHeight: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'tomato'
  },

  file_system_buttons: {
    flex: 1,
  }
});