import { DefaultTheme, useTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    primaryColor: '#fffffa',
    onPrimaryColor: '#0d5c63',

    secondaryColor: '#0d5c63',
    onSecondaryColor: '#fff',

    tertiaryColor: '#44a1a0',
    onTertiaryColor: '#fff',

    fourthColor: '#78cdd7',
    onFourthColor: '#fff',

    fifthColor: '#247b7b',
    onFifthColor: '#fff',
  },
}

export type AppTheme = typeof theme
export type AppThemeColors = AppTheme['colors']
export const useAppTheme = () => useTheme<AppTheme>()
