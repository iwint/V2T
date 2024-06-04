import React from 'react';
import {Button} from 'react-native';
import {ScreenNavProps} from '../../../navigation/type';

const OnboardingScreen = (props: ScreenNavProps) => {
  return (
    <Button
      title="Go to Main Stack"
      onPress={() => {
        props.navigation.navigate('Main', {screen: 'AllTranscriptions'});
      }}
    />
  );
};

export default OnboardingScreen;
