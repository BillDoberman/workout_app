import { React, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, Text, Picker } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ExerciseSet from './ExerciseSet';

function Exercise({ exercise_index, exercise_options, loaded_exercise, modify_value }) {

  const [saved_sets, setExerciseSets] = useState([])
  const [default_exercise_type, setExerciseType] = useState("squat")

  const addSet = () => {
    let newSet = newSetJSX(saved_sets.length)
    setExerciseSets([...saved_sets, newSet])
  }

  const removeSet = () => {
    if (saved_sets.length > 0) {
      modifyValue(-1, null, null)
    }
    let new_saved_sets = saved_sets.slice(0, saved_sets.length - 1)
    setExerciseSets(new_saved_sets)
  }

  const modifyValue = (set_index, key, value) => {
    modify_value(exercise_index, set_index, key, value)
  }

  const newSetJSX = (index) => {
    load_this = { weight : "0", reps : "0" }
    if (loaded_exercise) {
      if (index < loaded_exercise.sets.length) {
        load_this = loaded_exercise.sets[index] 
      }
    }
    return <ExerciseSet 
            key={index} 
            set_index={index}
            loaded_set={load_this}
            modify_value={modifyValue}
          />
  }

  useEffect(() => {
    if (loaded_exercise) {
      let newSets = []
      for (i = 0; i < loaded_exercise.sets.length; i++) {
        newSets.push(newSetJSX(i))
      }
      setExerciseType(loaded_exercise.type)
      setExerciseSets(newSets)
    }
  }, []);

  return (
    <View style={styles.exercise_view}>
      <View style={{flexDirection: 'row'}}>
        <Button title="  -  set " onPress={removeSet} />
        <SelectDropdown
          data={ exercise_options }
          defaultValue={default_exercise_type}
          onSelect={(selectedItem, index) => {
            modify_value(exercise_index, "none", "type", selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        <Button title="  +  set " onPress={addSet} />
      </View>
      { saved_sets }
    </View>
  );
}

export default Exercise;

const styles = StyleSheet.create({
  exercise_view: {
    minHeight: 50,
    flexDirection: 'column',
    alignItems: 'center'
  },
});