import { React, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, ScrollView, Text } from 'react-native';
import FileIOBar from './FileIOBar'
import { saveDataLibrary } from './FileIOBar';
import Exercise from './Exercise';

function Workout({ route }) {
  const filio_bar = true ? <FileIOBar /> : null;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const readableDate = new Date().toLocaleDateString('en-US', options);
  const [date, setDate] = useState(readableDate)
  const [exercises, setExercises] = useState([])

  exercise_types = Object.keys(route.params.data_library["exercise_types"])
  //route.params.data_library["workouts"]["camo"] = "file"
  //saveDataLibrary(route.params.data_library)

  const addExercise = () => {
    const newExercise = <Exercise exercise_options={exercise_types} key={exercises.length + 1}/>
    setExercises([...exercises, newExercise])
  }

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