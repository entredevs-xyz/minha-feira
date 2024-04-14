import { useAppTheme } from "@/theme"
import { Platform, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"


export const useStyles = () => {

    const { colors } = useAppTheme()
    const insets = useSafeAreaInsets()
    const isAndroid = Platform.OS === 'android'

    return StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primaryColor,
        elevation: 25,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      },
      header: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        width: '100%',
        borderBottomColor: colors.secondaryColor + '20',
        borderBottomWidth: 1,
      },
      addItemContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        width: '100%',
        marginBottom: 10,
      },
      description: {
        flex: 1,
        fontWeight: 'bold',
        backgroundColor: colors.primaryColor,
      },
      button: {
        height: 50,
        justifyContent: 'center',
        marginTop: 5,
        borderRadius: 5,
        borderColor: colors.secondaryColor,
        backgroundColor: colors.secondaryColor,
      },
      modalStyle: {
        backgroundColor: colors.secondaryColor,
        padding: 5,
        borderRadius: 5,
        width: '95%',
        alignSelf: 'center',
      },
      dateModalStyle: {
        backgroundColor: isAndroid ? 'transparent' : colors.secondaryColor,
        elevation: isAndroid ? 0 : 25,
        padding: 5,
        borderRadius: 5,
        height: 420,
        width: '95%',
        alignSelf: 'center',
      },
      listItem: {
        backgroundColor: colors.secondaryColor,
        borderRadius: 5,
        margin: 5,
        padding: 5,
        width: '95%',
      },
      itemLabel: {
        color: colors.onSecondaryColor,
        fontSize: 16,
      },
      itemValue: {
        color: colors.tertiaryColor,
        fontSize: 16,
      },
      itemIcon: {
        color: colors.tertiaryColor,
      },
      removeButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      },
      scrollViewContainer: {
        width: '100%',
      },
      summaryContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        borderTopColor: colors.secondaryColor + '20',
        borderTopWidth: 1,
      },
      totalValue: {
        fontWeight: 'bold',
        fontSize: 25,
        color: colors.tertiaryColor,
      },
      totalLabel: {
        fontWeight: 'bold',
        fontSize: 25,
        color: colors.tertiaryColor,
      },
      safeAreaView: {
        flex: 1,
      },
    })

}