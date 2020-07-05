
import {DefaultTheme, Colors,} from 'react-native-paper'
import { blue700 } from 'react-native-paper/lib/typescript/src/styles/colors';


export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#fff',
      notification: Colors.green600,
      background: '#7be26f',
      verde:'#167700',
      amarelo:'#ffcb06',
      textColor: '#008000'
    },
  };

export interface ThemeColors {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    onSurface: string;
    onBackground: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;
    verde: string;
    amarelo: string;
    textColor: string;
}