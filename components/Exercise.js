import { React, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, Text } from 'react-native';

function Exercise({ navigation }) {
  return (
    <View style={styles.exercise_view}>
      <Text>hello</Text>
    </View>
  );
}

export default Exercise;

const styles = StyleSheet.create({
  exercise_view: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});