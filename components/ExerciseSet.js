import { React, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button, Text, Picker, TextInput } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

function ExerciseSet({ navigation, exercise_options, set_number }) {
  const [weight, setWeight] = useState("0")
  const [old_input_value, setOldInputValue] = useState("0")
  const [reps, setReps] = useState("0")
  const inputRef = useRef(null)

  const handleWeightFocus = () => {
    setWeight("")
  }

  const validateWeight = () => {
    let value = parseFloat(weight)
    if (isNaN(value)) {
      setWeight(old_input_value)
    } else {
      setWeight(Math.abs(value).toString())
    }
  }

  const validateReps = () => {
    let value = parseInt(reps)
    if (isNaN(value)) {
      setReps(old_input_value)
    } else {
      setReps(Math.abs(value).toString())
    }
  }
  
  return (
    <View style={styles.exercise_set}>
      <Text style={styles.set_number}>#{set_number}</Text>
      <Text style={styles.text}>weight</Text>
      <TextInput
        ref={inputRef}
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

  set_number: {
    flex: 0.2,
    fontSize: 15,
    textAlign: 'center'    
  }
});