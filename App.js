import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Workout from './components/Workout';
import Home from './components/Home';

const Stack = createNativeStackNavigator();

function MyStack() {

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