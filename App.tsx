import 'reflect-metadata'
import React from 'react'
import Router from '@/router'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { theme } from '@/theme'
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


