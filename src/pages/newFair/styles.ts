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
        justifyContent: 'flex-start',
        backgroundColor: colors.primaryColor,
        elevation: 25,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      },
      header: {
        flexDirection: 'row',
        gap: 10,
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
      },
      description: {
        flex: 1,
        fontWeight: 'bold',
        backgroundColor: colors.primaryColor,
      },
      button: {
        borderColor: colors.secondaryColor,
        backgroundColor: colors.secondaryColor,
      },
      modalStyle: {
        backgroundColor: 'white',
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