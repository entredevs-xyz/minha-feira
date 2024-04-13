import React from 'react'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { View } from 'react-native'
import Routes from '@/router/routes'
import { useAppTheme } from '@/theme'

const Router = () => {

  const { colors } = useAppTheme()

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View
          style={{
            backgroundColor: colors.primaryColor,
            flex: 1,
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
