import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn

const styles = StyleSheet.create({
    btnContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 12 / 1.25,
        justifyContent: "center",
        alignItems: "center",
      },
      btnImg: (dimension) => ({
        width: dimension,
        height: dimension,
        borderRadius: 12 / 1.25,
      }),
})