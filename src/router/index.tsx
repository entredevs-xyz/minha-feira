import React from 'react'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { View } from 'react-native'
import Routes from '@/router/routes'

const Router = () => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View
          style={{
            flex: 1,
            paddingTop: insets?.top,
            paddingBottom: insets?.bottom,
          }}
        >
          <Routes />
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}
export default Router
