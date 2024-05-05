import { DefaultTheme, useTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    primaryColor: '#ffffff',
    onPrimaryColor: '#0d5c63',

    secondaryColor: '#0d5c63',
    onSecondaryColor: '#ffffff',

    tertiaryColor: '#44a1a0',
    onTertiaryColor: '#ffffff',

    fourthColor: '#78cdd7',
    onFourthColor: '#ffffff',

    fifthColor: '#247b7b',
    onFifthColor: '#ffffff',
  },
}

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    primaryColor: '#041d1f',
    onPrimaryColor: '#0d5c63',

    secondaryColor: '#0d5c63',
    onSecondaryColor: '#041d1f',

    tertiaryColor: '#44a1a0',
    onTertiaryColor: '#041d1f',

    fourthColor: '#78cdd7',
    onFourthColor: '#041d1f',

    fifthColor: '#247b7b',
    onFifthColor: '#041d1f',
  },
}

export type AppTheme = typeof theme
export type AppThemeColors = AppTheme['colors']
export const useAppTheme = () => useTheme<AppTheme>()
