import React from 'react'
import { View } from 'react-native'
import { ScreenNavProps } from '../../../navigation/type'
import { FAB } from 'react-native-paper'
import FloatingActionButton from '../../../components/FloatingAction'



const Login = (props: ScreenNavProps) => {

  return (
    <View className='flex items-center justify-center w-[100%] bg-[#000] h-full'>
      <FloatingActionButton />
      {/* <Icon
        name='mic'
        size={32}
        color={"#fff"}
      />
      <Button
        title='Navigate'
        onPress={() => props.navigation.push('Onboarding')}
      /> */}
    </View>
  )
}

export default Login