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

  const exercise_types = Object.keys(route.params.exercise_options)

  const addExercise = () => {
    const newExercise = createExerciseJSX(exercises.length, null)
    setExercises([...exercises, newExercise])
  }

  const createExerciseJSX = (index, workout_data) => {
    let load_this = workout_data ? workout_data.exercises[index] : null
    return <Exercise 
      loaded_exercise={load_this}
      exercise_options={exercise_types}
      exercise_index={index}
      modify_value={modify_value} 
      key={index}/>
  }

  const modify_value = (exercise_index, set_index, key, value) => {
    route.params.modifyValue(route.params.workout_date, exercise_index, set_index, key, value)
  }

  const loadWorkout = (workout_data) => {
    let new_exercises = []
    for (i = 0; i < workout_data.exercises.length; i++) {
      new_exercises.push(createExerciseJSX(i, workout_data))
    }
    setExercises(new_exercises)
  }

  useEffect(() => {
    let workout_data = route.params.current_workout

    if (workout_data) {
      loadWorkout(workout_data)
    } else {
      console.error("there should always be workout data passed in");
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