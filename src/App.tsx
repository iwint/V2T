import axios from 'axios';
import React, { useState } from 'react';
import {
  NativeModules,
  Permission,
  PermissionsAndroid,
  ToastAndroid,
  useColorScheme
} from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import 'react-native-gesture-handler';
import { Navigator } from './navigation';
import { PaperProvider } from 'react-native-paper';

const { PERMISSIONS, check, RESULTS, request } = PermissionsAndroid;
const BASE_URL = 'http://192.168.238.67:8000/get_text';
const { CalenderModule } = NativeModules

function App(): React.JSX.Element {
  const [text, setText] = useState("")
  const isDarkMode = useColorScheme() === 'dark';
  const [audioFile, setAudioFile] = useState<any>(null);

  const checkPermission = async (permissionOf: Permission) => {
    const permissionStatus = await PermissionsAndroid.check(permissionOf);
    if (!permissionStatus) {
      const response = await request(permissionOf);
      return response === RESULTS.GRANTED;
    } else {
      return true;
    }
  };

  const handleAudioPicker = () => {
    return new Promise((resolve, reject) => {
      try {
        const response = DocumentPicker.pickSingle({
          type: types.audio,
          mode: 'open',
          presentationStyle: 'fullScreen',
          transitionStyle: 'flipHorizontal',
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleGetAudio = async () => {
    CalenderModule.createCalenderEvent("Party", "My Home");
    try {
      const permissionStatus = await checkPermission(
        PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      console.log('CALLING...', permissionStatus);
      if (!permissionStatus) {
        const file = await handleAudioPicker();
        setAudioFile(file);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetText = () => {

    const formData = new FormData();
    console.log(audioFile);

    formData.append('files', {
      type: 'audio/mpeg',
      uri: audioFile.uri,
      name: 'audio.mp3',
    });


    return new Promise(async (resolve, reject) => {
      ToastAndroid.show(BASE_URL, ToastAndroid.SHORT);
      const response = await axios.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.status === 200 || response.status === 201) {
        ToastAndroid.show("Got response", ToastAndroid.SHORT)
        console.log('DATA', response.data);
        setText(response.data?.result[0]?.transcript)
        resolve(response.data)
      } else {
        reject(response)
      }

    });
  };

  return (
    // <View className="w-full h-[90%] bg-[#fff] flex items-center p-2">
    //   {text !== "" ? <Text className='w-[100%] text-[#000] dark:text-[#fff] text-justify' >{text}</Text> : audioFile !== null ? (
    //     <Button title="Get Text" onPress={() => handleGetText()} />
    //   ) : (
    //     <Button title="Get Audio" onPress={() => handleGetAudio()} />
    //   )}
    // </View>
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
}

export default App;
