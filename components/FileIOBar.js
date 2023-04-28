import { React, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Button } from 'react-native';

const DATA_FILENAME = "data.json"
//#region data library defaults
export var default_data_library = {
  exercise_types: {
    "bench press": ["chest", "arms"],
    "curls": ["arms"],
    "squat": ["legs"],
    "deadlift": ["legs", "back"]},
  body_parts: ["arms", "legs", "chest", "back"],
  workouts: {}
}
//#endregion

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

export const readDataFromFileOld = async(file_uri) => {

  myJsonObj = {}

  checkFileExists(file_uri)
    .then(() => FileSystem.readAsStringAsync(file_uri, { encoding: FileSystem.EncodingType.UTF8 } ))
    .then(value => { 
      myJsonObj = JSON.parse(value)
      console.log(myJsonObj)
    }).catch(error => {
      console.log("error reading " + error)
      myJsonObj = default_data_library
    })
  
    return myJsonObj
}

export const readDataFromFile = async(file_uri) => {

  let myJsonObj = {}

  try {
    myJsonObj = await FileSystem.readAsStringAsync(file_uri, { encoding: FileSystem.EncodingType.UTF8 } )
  } catch(error) {
    myJsonObj = default_data_library
  }

  return myJsonObj
}

export const getDataFileName = () => {
  return `${FileSystem.documentDirectory}${DATA_FILENAME}`;
}

const DeleteFile = async(file_uri) => {

  checkFileExists(file_uri)
    .then(() => FileSystem.deleteAsync(file_uri))
    .then(console.log("delete success"))
    .catch(error => console.log("error deleting " + error))
}


const writeDataToFile = async(fileUri, json_object) => {

  const json_string = JSON.stringify(json_object)
  checkFileExists(fileUri)
  .then(() => FileSystem.writeAsStringAsync(fileUri, json_string))
  .then(()=> console.log("write success"))
  .catch(error => console.log("problem writing " + error))

}

function FileIOBar({ navigation }) {
  data_to_write = { hello: "world 2 electric bugaloo0" }
  const file_uri = `${FileSystem.documentDirectory}${DATA_FILENAME}`;

  return (
    <View 
      style={styles.file_system_button_bar}>
        <View style = {styles.file_system_buttons}>
          <Button color="dodgerblue" onPress={() => readDataFromFile(file_uri)}
            title="read"
          />
        </View>
      <View style = {styles.file_system_buttons}>
        <Button color="dodgerblue" onPress={() => writeDataToFile(file_uri, data_to_write)}
          title="write"
        />
      </View>
      <View style = {styles.file_system_buttons}>  
        <Button color="tomato" onPress={() => DeleteFile(file_uri)}
          title="delete"
        />
      </View>
    </View>
  );
}

export default FileIOBar;

const styles = StyleSheet.create({
  file_system_button_bar: {
    flex: 1,
    maxHeight: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'tomato'
  },

  file_system_buttons: {
    flex: 1,
  }
});