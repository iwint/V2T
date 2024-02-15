import React from 'react'
import { View } from 'react-native'
import FloatingActionButton from '../../../components/FloatingAction'
import { ScreenNavProps } from '../../../navigation/type'
import Modal from '../../../components/Modal'



const Login = (props: ScreenNavProps) => {

  return (
    <View className='flex items-center justify-center w-[100%] bg-[#000] h-full'>
      <FloatingActionButton />
      <Modal />
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