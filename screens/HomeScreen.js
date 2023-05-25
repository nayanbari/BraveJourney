import { SafeAreaView, Text, View, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc';
import { images } from '../constants'
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env'
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';


const HomeScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCurrentLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                // Handle permission denied
            }
            else{
                const location = await Location.getCurrentPositionAsync({})
                console.log(location.coords);
            }
        }
        getCurrentLocation()
    }, [])
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
            source={images.logo}
            style={{width: 256, height: 100}}
            resizeMode='contain'
        />

        <GooglePlacesAutocomplete
            placeholder='Where from?'
            onPress={(data, details = null) => {
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                }))
            }}
            query={{
                key: GOOGLE_MAPS_KEY,
                language: 'en',
                components: 'country:in'
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            styles={{
                container: {
                    flex: 0
                },
                textInput: {
                    fontSize: 18,
                },
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            retuunKeyType={"search"}
            minLength={2}
            currentLocation={true}
            currentLocationLabel='Current location'
        />
        
      <NavOptions />

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen