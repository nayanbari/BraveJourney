import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title: "Start journey",
        image: icons.travel,
        screen: "MapScreen"
    }
]

const NavOptions = () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)

  return (
    <FlatList 
        data={data}
        horizontal
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={tw`p-3 pl-3 pb-4 pt-3 bg-gray-100 m-2 rounded-lg`}
            onPress={() => navigation.navigate(item.screen)}
            >
                <View style={tw`${!origin && 'opacity-20'}`}>
                    <View style={tw`p-2 flex justify-center bg-white rounded-lg`}>
                        <Image 
                            style={{width: 36, height: 36}}
                            source={item.image}
                            resizeMode='contain'
                        />

                    </View>
                    <Text style={tw`pl-3 pr-6 text-lg font-semibold self-center`}>{item.title}</Text>
                    <Icon
                        name='arrowright'
                        color='white'
                        type='antdesign'
                        style={tw`p-2 bg-black rounded-full w-10 mt-8`}
                    />
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default NavOptions
