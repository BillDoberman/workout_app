import * as React from 'react';
import { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Workout from './components/Workout';
import Home from './components/Home';
import { StyleSheet, Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { readDataFromFile, getDataFileName, default_data_library } from './components/FileIOBar';

const Stack = createNativeStackNavigator();

function MyStack() {

  const [data_library, setDataLibrary] = useState(null)
  const [content, setContent] = useState(null)
  //const [exercise_options, setExercises] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await readDataFromFile(getDataFileName())
      setDataLibrary(result)
    }

    fetchData();
  }, []);

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
            initialParams={{data_library}}
          />
        </Stack.Navigator>) : 
        (<SafeAreaView style = {styles.loading}>
          <Text style={{color:'white', fontSize: 50}}>loading...</Text>
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
