import 'reflect-metadata'
import React from 'react'
import Router from '@/router'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { darkTheme, theme } from '@/theme'
import { DatabaseConnectionProvider } from '@/data/connection'
import { useColorScheme } from 'react-native';

export default function App() {

  const colorScheme = useColorScheme()
  const currentTheme = colorScheme === 'dark' ? darkTheme : theme;

  return (
    <DatabaseConnectionProvider>
      <PaperProvider theme={currentTheme}>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </PaperProvider>
    </DatabaseConnectionProvider>
  )
}


