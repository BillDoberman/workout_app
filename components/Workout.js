import { React, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import FileIOBar from './FileIOBar'
import Exercise from './Exercise';

function Workout({ navigation }) {
  const filio_bar = false ? <FileIOBar /> : null;

  const [exercises, setExercises] = useState([])

  const addExercise = () => {
    const newExercise = <Exercise exercise_options={["bench", "squat", "deadlift"]} key={exercises.length + 1}/>
    setExercises([...exercises, newExercise])
  }

  return (
    <View style={styles.main_view}>
      {filio_bar}
      <ScrollView style={styles.scrollview} contentContainerStyle={{flexGrow: 1, width: '100%'}}>
        {exercises}
        <Button title='+ exercise' onPress={addExercise}/>
      </ScrollView>
    </View>    
  );
}

export default Workout;

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  scrollview: {
    flex: 1,
    backgroundColor: 'white',
  }
});