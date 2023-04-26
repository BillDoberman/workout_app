import React, { useState } from 'react';
import { Button } from 'react-native';

function Home({ navigation }) {
  return (
    <Button
      title="Go to Workout"
      onPress={() => navigation.navigate('Workout')}
    />
  );
}

export default Home;