
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppStart from './index'
import { Provider as PaperProvider} from 'react-native-paper'
import { theme } from './theme';

const Stack = createStackNavigator();





const Router = () => {
  return (<PaperProvider theme={theme}>
    <SafeAreaProvider>
      <NavigationContainer >
        <Stack.Navigator headerMode="none" initialRouteName={"Start"} >
          <Stack.Screen name="Start" component={AppStart} />
        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
    </PaperProvider>)
}

export default Router;
