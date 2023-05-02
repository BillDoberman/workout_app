import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { readDataFromFile, getDataFileName, default_data_library, saveDataLibrary } from './FileIOBar';


function Home({ navigation }) {

  const [data_library, setDataLibrary] = useState(null)
  const [exercise_options, setExercises] = useState(null)
  const [current_workout, setCurrentWorkout] = useState(null)
  const [workout_date, setWorkoutDate] = useState(null)
  
  const go_left = (workout_date) => {
    loadDifferentWorkout(workout_date, -1)
  }

  const go_right = (workout_date) => {
    loadDifferentWorkout(workout_date, 1)
  }

  const loadDifferentWorkout = (workout_date, index_change) => {
    let workout_dates = Object.keys(data_library["workouts"])
    let index = workout_dates.indexOf(workout_date)
    let new_index = Math.min(workout_dates.length - 1, Math.max(0, (index + index_change)))
    let new_date = workout_dates[new_index]
    workout_to_use = data_library["workouts"][new_date]
    if (index == new_index) {
      console.log("reached end of workouts. not moving.")
    } else {
      navigation.replace('Workout', 
          {exercise_options: exercise_options, 
           current_workout: workout_to_use, 
           workout_date: new_date, 
           modifyValue : modifyMyValue, 
           goLeft: new_index > 0 ? go_left : null,
           goRight: new_index < workout_dates.length - 1 ? go_right : null
           })
    }
  }

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

    if (exercise_index == "none") {
      data_library["workouts"][workout_date][key] = value
      saveDataLibrary(data_library)
      return
    }
  
    if (exercise_index < 0) { // delete exercise
      let index_to_delete = Math.abs(exercise_index) - 1
      data_library["workouts"][workout_date]["exercises"][index_to_delete] = ""
      saveDataLibrary(data_library)
      return
    }
  
    if (set_index == "none") { // set the type of exercise, or other keys
      data_library["workouts"][workout_date]["exercises"][exercise_index][key] = value
      saveDataLibrary(data_library)
      return
    }
  
    // add a new set
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
    <View>
    {data_library 
    ? 
    (<Button
        title="Go to Workout"
        onPress={() => 
          navigation.navigate('Workout', {
            exercise_options, 
            current_workout, 
            workout_date, 
            modifyValue : modifyMyValue, 
            goLeft: go_left})}
      />) 
    : 
    (<SafeAreaView style = {styles.loading}>
      <Text style={{color:'white', fontSize: 30}}>loading...</Text>
    </SafeAreaView>)}
    </View>
  );
}

function getReadableDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const readableDate = new Date().toLocaleDateString('en-US', options);
  return readableDate;
}

export default Home;

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