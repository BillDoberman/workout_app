import { React, useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, ScrollView, Text } from 'react-native';
import FileIOBar from './FileIOBar'
import { saveDataLibrary } from './FileIOBar';
import Exercise from './Exercise';

function getReadableDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const readableDate = new Date().toLocaleDateString('en-US', options);
  return readableDate;
}

function Workout({ route }) {
  const filio_bar = true ? <FileIOBar /> : null;
  const [date, setDate] = useState(getReadableDate())
  const [exercises, setExercises] = useState([])

  const exercise_types = Object.keys(route.params.data_library["exercise_types"])

  const addExercise = () => {
    const newExercise = <Exercise exercise_options={exercise_types} key={exercises.length + 1}/>
    setExercises([...exercises, newExercise])
  }

  const loadWorkout = (workout_data) => {
    let new_exercises = []
    for (i = 0; i < workout_data.exercises.length; i++) {
      new_exercises.push(<Exercise 
        loaded_exercise={workout_data.exercises[i]} 
        exercise_options={exercise_types} 
        key={new_exercises.length + 1}/>)
    }
    setExercises(new_exercises)
  }

  useEffect(() => {
    let workout_data = route.params.data_library["workouts"][date]

    if (workout_data) {
      loadWorkout(workout_data)
    }
  }, []);

  return (
    <View style={styles.main_view}>
      {filio_bar}
      <Text style={styles.date_text}>{date}</Text>
      <View style={{height:20, backgroundColor:'white'}}></View>
      <ScrollView style={styles.scrollview} contentContainerStyle={{flexGrow: 1, width: '100%'}}>
        {exercises}
        <Button title='+ exercise' onPress= {() => addExercise()}/>
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
    fontSize: 25, 
    flex: 1,
    backgroundColor: 'white',
  },

  plus_exercise_btn: {
    height: 400
  },

  date_text: {
    fontSize: 20,
    height: 50,
    alignSelf: 'center',
    top: 10
  }
});