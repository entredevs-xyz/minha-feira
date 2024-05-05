import { useAppTheme } from "@/theme"
import { StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"



export const useStyles = () => {

    const { colors } = useAppTheme()
    const insets = useSafeAreaInsets()

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primaryColor,
            elevation: 25,
            paddingBottom: insets.bottom,
        },
        buttons: {
            borderRadius: 10,
            margin: 5,
            height: 100,
            width: 100,
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secondaryColor,
            color: colors.onSecondaryColor,
        },
        buttonsLabel: {
            display: 'flex',
            flexDirection: 'row',
            color: colors.onSecondaryColor,
        },
        welcome: {
            fontSize: 20,
            color: colors.onSecondaryColor,
            fontFamily: 'Roboto',
            textAlign: 'center',
        },
        refresh:{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 10,
        },
        theme:{
            position: 'absolute',
            top: insets.top,
            right: 20,
            zIndex: 10,
        },
        viewUp: {
            position: 'relative',
            flex: 0,
            height: 200,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: insets.top,
            paddingBottom: 50,
            width: '100%',
            justifyContent: 'flex-end',
            backgroundColor: colors.secondaryColor,
            borderBottomRightRadius: 1,
            borderBottomLeftRadius: 1,
            elevation: 10,
        },
        viewDown: {
            flex: 1,
            width: '100%',
            backgroundColor: colors.primaryColor,
            paddingBottom: 20,
            justifyContent: 'flex-start',
        },
        viewButtons: {
            justifyContent: 'center',
            flexDirection: 'row',
        },
        lineChart: {
            backgroundColor: colors.primaryColor,
            width: '95%',
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            elevation: 10,
            marginBottom: 20,
            alignSelf: 'center',
        },
        marca: {
            textAlign: 'center',
            color: colors.onPrimaryColor,
            textShadowColor: colors.onPrimaryColor,
        },
        media: {
            width: '95%',
            height: 100,
            alignSelf: 'center',
            top: -25,
            borderRadius: 10,
            marginBottom: 15,
            backgroundColor: colors.primaryColor,
            padding: 10,
            elevation: 10,
        },
        mediaTitle: {
            fontSize: 10,
            fontFamily: 'Roboto',
            color: colors.onPrimaryColor,
        },
        mediaPrice: {
            textAlign: 'center',
            fontSize: 50,
            fontFamily: 'Roboto',
            color: colors.onPrimaryColor,
        },
        mediaValue: {
            color: colors.onPrimaryColor,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        mediaSufix: {
            color: colors.onPrimaryColor,
            paddingTop: 10,
        },
        footer: {
            height: 20,
            width: '100%',
            position: 'absolute',
            bottom: 0,
        },
    })


}