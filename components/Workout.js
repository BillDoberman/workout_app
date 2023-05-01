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
  const filio_bar = false ? <FileIOBar /> : null;
  const [date, setDate] = useState(getReadableDate())
  const [exercises, setExercises] = useState([])
  const exercisesRef = useRef(exercises)
  const modify_callback = route.params
  const exercise_types = Object.keys(route.params.exercise_options)

  const addExercise = () => {
    const newExercise = createExerciseJSX(exercises.length, null)
    const newExercises = [...exercises, newExercise]
    setExercises(newExercises)
    exercisesRef.current = newExercises
    console.log("added exercise ", newExercises)
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
    if (exercise_index < 0) { // delete exercise
      let index_to_delete = Math.abs(exercise_index) - 1
      let newExercises = [...exercisesRef.current]
      newExercises[index_to_delete] = null
      setExercises(newExercises)
      exercisesRef.current = newExercises
      console.log("deleted exercise ", index_to_delete, newExercises)
    }

    route.params.modifyValue(route.params.workout_date, exercise_index, set_index, key, value)
  }

  const loadWorkout = (workout_data) => {
    let new_exercises = []
    for (i = 0; i < workout_data.exercises.length; i++) {
      if (workout_data.exercises[i] == "") { // empty string is a deleted exercise
        new_exercises.push(null)
      } else {
        new_exercises.push(createExerciseJSX(i, workout_data))
      }
    }
    setExercises(new_exercises)
    exercisesRef.current = new_exercises
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
      <View style={styles.date_bar}>
        <Button color={'gray'} title='  <  ' />
        <Text style={styles.date_text}>{date}</Text>
        <Button color={'gray'} title='  >  ' />
      </View>
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
  },

  date_bar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    //flex: 1
  }
});