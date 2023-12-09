import React from 'react'
import Router from './src/router'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { theme } from '@/theme'
import 'reflect-metadata'
import { DatabaseConnectionProvider } from '@/data/connection'

export default function App() {
  return (
    <DatabaseConnectionProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </PaperProvider>
    </DatabaseConnectionProvider>
  )
}
