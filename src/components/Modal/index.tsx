import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { IconButton } from 'react-native-paper'


type Props = {}

const width = Dimensions.get('screen').width

const Modal = (props: Props) => {
  return (
    <ReactNativeModal
      className='relative m-0 justify-end'
      isVisible
      swipeDirection={"down"}
      onSwipeComplete={() => {
        console.log("SWIPE");
      }}
      style={{ width: width }}
    >
      <View className='h-[70%] rounded-t-[15px] bg-[#3C3C3C]'>
        <View className='flex flex-row w-[100%] pl-4 pt-2 items-center justify-between absolute top-0' >
          <Text className='font-semibold text-[18px] text-[#fff]'>Hello</Text>
          <IconButton
            icon={"close"}
            iconColor='#fff'
          />
        </View>
      </View>
    </ReactNativeModal>
  )
}

export default Modal