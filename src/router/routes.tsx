import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import AppStart from '@/pages/appStart'
import Dashboard from '@/pages/dashboard'
import NewFair from '@/pages/newFair'
import FairHistory from '@/pages/history'

export type RootStackParamList = {
  AppStart: undefined
  Dashboard: undefined
  NewFair: { id: number } | undefined
  FairHistory: undefined
}

export type RouteProps = StackScreenProps<
  RootStackParamList,
  'AppStart' | 'Dashboard' | 'NewFair' | 'FairHistory'
>

const Stack = createStackNavigator<RootStackParamList>()

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'AppStart'}
      >
        <Stack.Screen name="AppStart" component={AppStart} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="NewFair" component={NewFair} />
        <Stack.Screen name="FairHistory" component={FairHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
