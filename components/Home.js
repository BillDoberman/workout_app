import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({ navigation }) {
  return (
    <View>
      <Button
        title="Go to Workout"
        onPress={() => navigation.navigate('Workout')}
      />
    </View>
  );
}

export default Home;