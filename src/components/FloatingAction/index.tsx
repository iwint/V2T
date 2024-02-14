import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { IconButton } from 'react-native-paper'

type Props = {}

const FloatingActionButton = (props: Props) => {
  return (
    <View className='absolute bottom-10 rounded-[10px] right-3 '>
      <IconButton
        style={{ backgroundColor: "#DE2121" }}
        icon={() => <Icon
          name='cloud-upload'
          color={"#fff"}
          size={24}
        />}
      />
      <IconButton
        style={{ backgroundColor: "#DE2121" }}
        icon={() => <Icon
          name='mic'
          color={"#fff"}
          size={24}
        />}
      />
      <IconButton
        style={{ backgroundColor: "#DE2121" }}
        icon={() => <Icon
          name='add'
          color={"#fff"}
          size={28}
        />}
      />
    </View>
  )
}

export default FloatingActionButton

const styles = StyleSheet.create({})