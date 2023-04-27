import { React, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button } from 'react-native';
import FileIOBar from './FileIOBar'
import Exercise from './Exercise';

function Workout({ navigation }) {
  const [exercises, setExercises] = useState([])

  const addExercise = () => {
    const newExercise = <Exercise key={exercises.length + 1}/>
    setExercises([...exercises, newExercise])
  }

  return (
    <View style={styles.main_view}>
      <FileIOBar />
      {exercises}
      <Button title='+ exercise' onPress={addExercise}/>
    </View>    
  );
}

export default Workout;

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center'
  }
});