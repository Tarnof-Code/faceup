import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import SnapScreen from './screens/SnapScreen';
import GalleryScreen from './screens/GalleryScreen';
import gallery from "./reducers/gallery";

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ gallery }));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Gallery') {
            iconName = 'photo-library'
          } else if (route.name === 'Snap') {
            iconName = 'photo-camera'
          }
          return <MaterialIcons name={iconName} size={25} color={color} />;

        },
      })}

      tabBarOptions={{
        activeTintColor: '#009788',
        inactiveTintColor: '#FFFFFF',
        activeBackgroundColor: "#111224",
        inactiveBackgroundColor: "#111224",
      }}
    >
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
    </Tab.Navigator>

  )
}



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNav" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
