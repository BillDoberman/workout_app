import * as React from 'react';
import { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Workout from './components/Workout';
import Home from './components/Home';
import { StyleSheet, Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { readDataFromFile, getDataFileName, default_data_library, saveDataLibrary } from './components/FileIOBar';

const Stack = createNativeStackNavigator();

function getReadableDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const readableDate = new Date().toLocaleDateString('en-US', options);
  return readableDate;
}

function MyStack() {

  const [data_library, setDataLibrary] = useState(null)
  const [content, setContent] = useState(null)
  const [exercise_options, setExercises] = useState(null)
  const [current_workout, setCurrentWorkout] = useState(null)
  const [workout_date, setWorkoutDate] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await readDataFromFile(getDataFileName())
      setExercises(result["exercise_types"])
      let date = getReadableDate()
      if (!result["workouts"][date]) {
        result["workouts"][date] = { "exercises" : [] }
      }
      setCurrentWorkout(result["workouts"][date])
      setWorkoutDate(date)
      setDataLibrary(result)
    }

    fetchData();
  }, []);

  const modifyMyValue = (workout_date, exercise_index, set_index, key, value) => {
    if (!data_library["workouts"][workout_date]) {
      data_library["workouts"][workout_date] = { exercises : [] }
    }

    if (data_library["workouts"][workout_date]["exercises"].length <= exercise_index) {
      data_library["workouts"][workout_date]["exercises"].push({"sets" : [], "type": "squat"})
    }

    if (exercise_index < 0) { // delete exercise
      let index_to_delete = Math.abs(exercise_index) - 1
      data_library["workouts"][workout_date]["exercises"][index_to_delete] = ""
      return
    }

    if (set_index == "none") { // set the type of exercise, or other keys
      data_library["workouts"][workout_date]["exercises"][exercise_index][key] = value
      saveDataLibrary(data_library)
      return
    }

    if (data_library["workouts"][workout_date]["exercises"][exercise_index]["sets"].length <= set_index) {
      data_library["workouts"][workout_date]["exercises"][exercise_index]["sets"].push({"weight" : 0, "reps" : 0})
    }

    if (set_index < 0) { // delete set
      data_library["workouts"][workout_date]["exercises"][exercise_index]["sets"].pop()
      saveDataLibrary(data_library)
      return
    }

    data_library["workouts"][workout_date]["exercises"][exercise_index]["sets"][set_index][key] = value
    saveDataLibrary(data_library)
  }

  return (
    <NavigationContainer>
        {data_library ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Workout App', headerTitleAlign: 'center'}}
          />
          <Stack.Screen 
            name="Workout" 
            component={Workout}
            options={{title: 'Workout App', headerTitleAlign: 'center'}}
            initialParams={{exercise_options, current_workout, workout_date, modifyValue : modifyMyValue}}
            //initialParams={{exercise_options, current_workout, workout_date}}
          />
        </Stack.Navigator>) : 
        (<SafeAreaView style = {styles.loading}>
          <Text style={{color:'white', fontSize: 30}}>loading...</Text>
        </SafeAreaView>)}
    </NavigationContainer>
  );
};

export default MyStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'dodgerblue'
  }
});
