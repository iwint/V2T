import React from 'react'
import { Button, View } from 'react-native'
import { ScreenNavProps } from '../../../navigation/type'


const Login = (props: ScreenNavProps) => {

  return (
    <View className='flex items-center justify-center w-[100%] h-full'>
      <Button
        title='Navigate'
        onPress={() => props.navigation.push('Onboarding')}
      />
    </View>
  )
}

export default Login