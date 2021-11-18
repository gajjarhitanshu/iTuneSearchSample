import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screen/SearchScreen';
import SongDetail from '../screen/SongDetail';

export default function NavStart() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SongDetail"
            component={SongDetail}
            options={{headerTitle: 'Detail'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
