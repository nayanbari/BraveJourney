import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from "react";
import { MapView, Marker } from "react-native-maps";
import { selectDestination, selectOrigin } from '../slices/navSlice';
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_MAPS_KEY } from '@env'
import getRoutesFromGoogleMaps from '../utilities/getRoutes';
import { setSelectedRoute } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';


const RideOptionsCard = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const [clickRoute, setClickRoute] = useState(null);
  const [routes, setRoutes] = useState([])
  useEffect(async() => {
    const data = await getRoutesFromGoogleMaps(`${origin.location.lat},${origin.location.lng}`, `${destination.location.lat},${destination.location.lng}`)
    setRoutes(data)
    data.forEach((route, index) => {
      // Perform additional operations for each route
      console.log(`Route ${index + 1}:`);
      console.log(`- Distance: ${route.legs[0].distance.text}`);
      console.log(`- Duration: ${route.legs[0].duration.text}`);
      // ... perform other operations
    });
  }, [origin, destination])


  const selectRoute = (route) => {
    // console.log(route)
    dispatch(setSelectedRoute({
      route: route
    }))
    setClickRoute(route);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectRoute(item)}>
      <View style={{ marginVertical: 10 }}>
        <Text>Distance: {item.legs[0].distance.text}</Text>
        <Text>Duration: {item.legs[0].duration.text}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View>
      {routes.length > 0 ? (
        <FlatList
          data={routes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No routes found.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FeedbackScreen')}>
        <Text style={styles.buttonText}>End</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

