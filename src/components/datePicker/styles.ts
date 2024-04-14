import { useAppTheme } from "@/theme"
import { Platform, StyleSheet } from "react-native"


export const useStyles = () => {

    const { colors } = useAppTheme()
    const isAndroid = Platform.OS === 'android'

    return StyleSheet.create({
      dateModalStyle: {
        backgroundColor: isAndroid ? 'transparent' : colors.secondaryColor,
        elevation: isAndroid ? 0 : 25,
        padding: 5,
        borderRadius: 5,
        height: 420,
        width: '95%',
        alignSelf: 'center',
      }
    })

}