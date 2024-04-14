import React, { useCallback, useEffect, useState } from 'react'
import { loadAsync as fontLoadAsync } from 'expo-font'
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen'
import { View } from 'react-native'
import { RouteProps } from '@/router/routes'

preventAutoHideAsync()

const AppStart:React.FC<RouteProps> = ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await fontLoadAsync({
          Roboto: require('@/assets/fonts/Roboto/Roboto-Bold.ttf'),
          Bebas: require('@/assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf'),
        })
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync()
      navigation.navigate('Dashboard')
    }
  }, [appIsReady, navigation])

  if (!appIsReady) return null
  return <View onLayout={onLayoutRootView}></View>
}

export default AppStart
