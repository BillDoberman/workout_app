import { React, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, Text, Picker } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ExerciseSet from './ExerciseSet';

function Exercise({ navigation, exercise_options }) {

  const [saved_sets, setExerciseSets] = useState([])

  const addSet = () => {
    let newSet = <ExerciseSet set_number={saved_sets.length + 1}/>
    setExerciseSets([...saved_sets, newSet])
  }

  const removeSet = () => {
    let new_saved_sets = saved_sets.slice(0, saved_sets.length - 1)
    setExerciseSets(new_saved_sets)
  }

  return (
    <View style={styles.exercise_view}>
      <View style={{flexDirection: 'row'}}>
        <Button title="  -  set " onPress={removeSet} />
        <SelectDropdown
          data={ exercise_options }
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
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