import React, { useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({ navigation }) {
  return (
    <SafeAreaView>
      <Button
        title="Go to Workout"
        onPress={() => navigation.navigate('Workout')}
      />
    </SafeAreaView>
  );
}

export default Home;