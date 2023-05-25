import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHeaderBtn from './components/ScreenHeaderBtn';
import { icons, images } from './constants';
import FeedbackScreen from './screens/FeedbackScreen';


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{flex: 1}} 
            behavior={Platform.OS === 'iso' ? 'padding' : 'height'}
            >
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerStyle: {backgroundColor: '#fff'},
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                  ),
                  headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                  ),
                  headerTitle: ""
                }}
                />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerStyle: {backgroundColor: '#fff'},
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                  ),
                  headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                  ),
                  headerTitle: ""
                }}
                />
              <Stack.Screen
                name='FeedbackScreen'
                component={FeedbackScreen}
                options={{
                  headerStyle: {backgroundColor: '#fff'},
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                  ),
                  headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                  ),
                  headerTitle: ""
                }}
                />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

