import { DefaultTheme, useTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    primaryColor: '#E3FEF7',
    onPrimaryColor: '#0d5c63',

    secondaryColor: '#0d5c63',
    onSecondaryColor: '#e9fbfc',

    tertiaryColor: '#44a1a0',
    onTertiaryColor: '#e9fbfc',

    fourthColor: '#78cdd7',
    onFourthColor: '#e9fbfc',

    fifthColor: '#247b7b',
    onFifthColor: '#e9fbfc',
  },
}

export type AppTheme = typeof theme
export type AppThemeColors = AppTheme['colors']
export const useAppTheme = () => useTheme<AppTheme>()
