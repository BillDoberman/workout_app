import * as React from 'react';
import { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Workout from './components/Workout';
import Home from './components/Home';
import { StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { readDataFromFile, getDataFileName, default_data_library } from './components/FileIOBar';

const Stack = createNativeStackNavigator();

function MyStack() {

  const [data_library, setDataLibrary] = useState(default_data_library)

  useEffect(() => {
    readDataFromFile(getDataFileName())
      .then(response => setDataLibrary(response))
      .catch(error => console.error("error loading data library " + error))
  }, []);

  return (
    <NavigationContainer>
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
        />
      </Stack.Navigator>
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
});
