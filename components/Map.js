import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Button} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_KEY } from '@env'
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectSelectedRoute } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import polyline from '@mapbox/polyline';
import tw from 'twrnc'
import MapViewDirections from 'react-native-maps-directions';
import { decode } from '@mapbox/polyline';

const API_KEY = GOOGLE_MAPS_KEY;

const Map = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    // const [destination, setDestination] = useState(null);
    const [coords, setCoords] = useState([])
    const [userLocation, setUserLocation] = useState(null);
    const [randomLocations, setRandomLocations] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentPopupLocation, setCurrentPopupLocation] = useState(null);
    const [feelingSafe, setFeelingSafe] = useState('');
    // const [routesetRouteCoords]
    const destination = useSelector(selectDestination)
    const origin = useSelector(selectOrigin)
    const selectedRoute = useSelector(selectSelectedRoute)
    const mapRef = useRef(null)

      // Request location permissions



    useEffect(() => {
      if(selectedRoute && selectedRoute.route.overview_polyline){
        const decodedPolyline = decode(selectedRoute.route.overview_polyline.points);
        const c = decodedPolyline.map(([latitude, longitude]) => ({
          latitude,
          longitude,
        }));
        console.log(c)
        setCoords(c) 
      }
    }, [selectedRoute])




    useEffect(() => {
      if (!origin || !destination) return

      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
      })

    }, [origin, destination])
    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
          console.log("Newlocation",newLocation)
          setLocation(newLocation);
        });
      })();
    }, []);
  
  
    let marker = null;
    if (location) {
      marker = <Marker coordinate={location.coords} />;
    }

    console.log(coords.length)
  
    return (
        <MapView
        ref={mapRef}
          style={tw`flex-1`}
          mapType='mutedStandard'
          initialRegion={{
            latitude: origin ? origin.location.lat : 37.78825,
            longitude: origin ? origin.location.lng : -122.4324,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {/* {origin && destination && (
            <MapViewDirections
              origin={origin.description}
              destination={destination.description}
              apikey={GOOGLE_MAPS_KEY}
              strokeWidth={3}
              strokeColor='black'
            />
          )} */}
          {selectedRoute && coords.length > 0 && (
            <Polyline
              coordinates={coords}
              strokeColor="#6C54F5"
              strokeWidth={4}
          />
          )}

          {origin?.location && (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng
              }}
              title='Origin'
              description={origin.description}
              identifier='origin'
            />
          )}

          {destination?.location && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng
              }}
              title='Destination'
              description={destination.description}
              identifier='destination'
            />
          )}
        </MapView>
    );
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: '100%',
        height: '50%',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 30,
        left: 10,
        right: 10,
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      },
      input: {
        flex: 1,
        height: 40,
        marginRight: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
      },
})