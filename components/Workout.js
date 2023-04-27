import { React, useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'

const DATA_FILENAME = "data.json"


const createDataFile = async (fileUri, content) => {
  try {
    await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
    console.log(`File ${filename} created successfully!`);
  } catch (error) {
    console.error(`Error creating file ${filename}:`, error);
  }
};

const checkFileExists = async (fileUri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.exists;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkFileSystem = async () => {
  const { exists } = await FileSystem.getInfoAsync(FileSystem.documentDirectory);
  if (!exists) {
    console.log('File system not ready yet!');
    return;
  }
};

const readDataFromFile = async(file_uri) => {

  myJsonObj = {}

  checkFileExists(file_uri)
    .then(() => FileSystem.readAsStringAsync(file_uri, { encoding: FileSystem.EncodingType.UTF8 } ))
    .then(value => { 
      myJsonObj = JSON.parse(value)
      console.log(myJsonObj)
    }).catch(error => console.log("no file found " + error))
  
    return myJsonObj

}

const writeDataToFile = async(fileUri, json_object) => {

  const json_string = JSON.stringify(json_object)
  checkFileExists(fileUri)
  .then(() => FileSystem.writeAsStringAsync(fileUri, json_string))
  .then(()=> console.log("write success"))
  .catch(error => console.log("problem writing " + error))

}

function Workout({ navigation }) {
  data_to_write = { hello: "world 2 electric bugaloo0" }
  const file_uri = `${FileSystem.documentDirectory}${DATA_FILENAME}`;

  return (
    <SafeAreaView>
      <Button onPress={() => readDataFromFile(file_uri)}
        title="read"
      />
      <Button onPress={() => writeDataToFile(file_uri, data_to_write)}
        title="write"
      />
    </SafeAreaView>
  );
}

export default Workout;