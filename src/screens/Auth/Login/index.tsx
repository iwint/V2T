import React, {useState} from 'react';
import {
  Permission,
  PermissionsAndroid,
  Platform,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import FloatingActionButton from '../../../components/FloatingAction';
import Modal from '../../../components/Modal';
import {ScreenNavProps} from '../../../navigation/type';
import DocumentPicker, {types} from 'react-native-document-picker';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import type {
  AudioSet,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import {GetPermissions} from '../../../utils/permission';
import axios from 'axios';

const BASE_URL = 'http://192.168.52.219:8000/get_text';
interface RecordingState {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  isRecording: boolean | undefined;
}

const Login = (props: ScreenNavProps) => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
    isRecording: false,
  });
  const [audioFile, setAudioFile] = useState<any>(null);
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    android: undefined,
    ios: undefined,
  });

  const audioRecorderPlayer = new AudioRecorderPlayer();
  audioRecorderPlayer.setSubscriptionDuration(0.1);

  //Start Record Function

  const startRecord = async (): Promise<void> => {
    const result = await GetPermissions();
    console.log(result);

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      return setRecordingState({
        ...recordingState,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        isRecording: true,
      });
    });
    setAudioFile({
      type: types.audio,
      uri: uri,
      name: 'sound.mp4',
    });
  };

  const pauseRecord = async (): Promise<void> => {
    try {
      const result = await audioRecorderPlayer.pauseRecorder();
      console.log(result);
      setRecordingState({
        ...recordingState,
        isRecording: false,
      });
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  const resumeRecord = async (): Promise<void> => {
    await audioRecorderPlayer.resumeRecorder();
  };

  const stopRecord = async (): Promise<void> => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordingState({
      ...recordingState,
      recordSecs: 0,
      recordTime: '0:00:00',
    });
    console.log(result);
  };

  const playRecord = async (): Promise<void> => {
    try {
      const result = await audioRecorderPlayer.startPlayer(audioFile.uri);
      const volume = await audioRecorderPlayer.setVolume(1.0);
      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        setRecordingState({
          ...recordingState,
          isRecording: false,
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const pausePlay = async (): Promise<void> => {
    await audioRecorderPlayer.pausePlayer();
  };

  const resumePlay = async (): Promise<void> => {
    await audioRecorderPlayer.resumePlayer();
  };

  const stopPlay = async (): Promise<void> => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const handleGetText = () => {
    setLoading(true);
    const formData = new FormData();
    console.log(audioFile);

    formData.append('files', {
      type: audioFile?.type,
      uri: audioFile?.uri,
      name: audioFile.name,
    });

    return new Promise(async (resolve, reject) => {
      ToastAndroid.show(BASE_URL, ToastAndroid.SHORT);
      const response = await axios.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        ToastAndroid.show('Got response', ToastAndroid.SHORT);
        console.log('DATA', response.data);
        setText(response.data?.result[0]?.transcript);
        resolve(response.data);
      } else {
        reject(response);
      }
      setLoading(false);
    });
  };

  const checkPermission = async (permissionOf: Permission) => {
    const permissionStatus = await PermissionsAndroid.check(permissionOf);
    if (!permissionStatus) {
      const response = await PermissionsAndroid.request(permissionOf);
      return response === PermissionsAndroid.RESULTS.GRANTED;
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
    try {
      const permissionStatus = await checkPermission(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      console.log('CALLING...', permissionStatus);
      const file: any = await handleAudioPicker();
      setAudioFile(file);
      console.log(file);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTest = async () => {
    console.log('TEST');
    setLoading(true);
    const response = await axios.get(BASE_URL).finally(() => {
      setLoading(false);
    });
    console.log(response.data);
  };

  return (
    <View className="flex items-center justify-center w-[100%] bg-[#000] h-full">
      <FloatingActionButton />
      <Modal />
      {loading ? (
        <Text>Loading....</Text>
      ) : (
        <>
          {text === '' ? (
            <>
              <View className="bg-[#fff] w-[90%] items-center justify-center h-[10%]">
                <Text className="text-[#000]">{recordingState.recordTime}</Text>
              </View>
              <View className="flex flex-row gap-3 w-[90%] mt-2 items-center justify-center h-[10%]">
                <Button onPress={startRecord} children={<Text>Record</Text>} />
                <Button
                  onPress={
                    recordingState.isRecording ? pauseRecord : stopRecord
                  }
                  children={
                    <Text>{recordingState.isRecording ? 'Pause' : 'Stop'}</Text>
                  }
                />
              </View>
              <View className="bg-[#fff] w-[90%] items-center justify-center h-[10%]">
                <Text className="text-[#000]">
                  {recordingState.playTime}/{recordingState.duration}
                </Text>
              </View>
              <View className="flex flex-row gap-3 w-[90%] mt-2 items-center justify-center h-[10%]">
                <Button onPress={playRecord} children={<Text>Play</Text>} />
                <Button onPress={stopPlay} children={<Text>Stop</Text>} />
              </View>
              {audioFile != null && (
                <View className="flex flex-row gap-3 w-[90%] mt-2 items-center justify-center h-[10%]">
                  <Button
                    onPress={handleGetText}
                    children={<Text>Get Text</Text>}
                  />
                </View>
              )}
            </>
          ) : (
            <Text>{text}</Text>
          )}
          <View className="flex flex-row gap-3 w-[90%] mt-2 items-center justify-center h-[10%]">
            <Button
              onPress={handleGetAudio}
              children={<Text>Pick Audio</Text>}
            />
          </View>
          <View className="flex flex-row gap-3 w-[90%] mt-2 items-center justify-center h-[10%]">
            <Button onPress={handleTest} children={<Text>Test</Text>} />
          </View>
        </>
      )}
    </View>
  );
};

export default Login;
