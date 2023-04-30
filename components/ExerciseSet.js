import { React, useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, Text, Picker, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

function ExerciseSet({ set_index, loaded_set, modify_value }) {
  const [weight, setWeight] = useState("0")
  const [reps, setReps] = useState("0")
  const [old_input_value, setOldInputValue] = useState("0")

  useEffect(() => {
    if (loaded_set) {
      setWeight(loaded_set.weight)
      setReps(loaded_set.reps)
      modify_value(set_index, "weight", loaded_set.weight)
      modify_value(set_index, "reps", loaded_set.reps)
    }
  }, []);

  const validateWeight = () => {
    let value = parseFloat(weight)
    if (isNaN(value)) {
      setWeight(old_input_value)
    } else {
      let new_weight_value = Math.abs(value).toString()
      setWeight(new_weight_value)
      modify_value(set_index, "weight", new_weight_value)
    }
  }

  const validateReps = () => {
    let value = parseInt(reps)
    if (isNaN(value)) {
      setReps(old_input_value)
    } else {
      let new_reps_value = Math.abs(value).toString()
      setReps(new_reps_value)
      modify_value(set_index, "reps", new_reps_value)
    }
  }
  
  return (
    <View style={styles.exercise_set}>
      <Text style={styles.set_index}>#{set_index + 1}</Text>
      <Text style={styles.text}>weight</Text>
      <TextInput
        value={weight} 
        selectionColor={'dodgerblue'}
        style = {styles.text_input}
        keyboardType='numeric'
        onChangeText={setWeight}
        onEndEditing={validateWeight}
        onSubmitEditing={validateWeight}
        onFocus={() => {
          setOldInputValue(weight)
          setWeight("")
        }}
      />
      <Text style={styles.text}>reps</Text>
      <TextInput 
        value={reps}
        selectionColor={'dodgerblue'}
        style = {styles.text_input}
        keyboardType='numeric'
        onChangeText={setReps}
        onEndEditing={validateReps}
        onSubmitEditing={validateReps}
        onFocus={() => {
          setOldInputValue(reps)
          setReps("")
        }}
      />
    </View>
  );
}

export default ExerciseSet;

const styles = StyleSheet.create({
  exercise_set: {
    minHeight: 75,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  text: {
    fontSize: 20,
    flex: 0.3,
    textAlign: 'center'    
  },

  text_input: {
    backgroundColor: 'lightgray',
    flex: 0.4,
    fontSize: 20,
    textAlign: 'center'    
  },

  set_index: {
    flex: 0.2,
    fontSize: 15,
    textAlign: 'center',
    color: "gray"   
  }
});