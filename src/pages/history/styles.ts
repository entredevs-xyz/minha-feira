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
        listItem: {
          backgroundColor: colors.secondaryColor,
          borderRadius: 5,
          margin: 5,
          padding: 5,
          width: '95%',
        },
        description: {
          flex: 1,
          fontWeight: 'bold',
        },
        button: {
          borderColor: colors.secondaryColor,
          backgroundColor: colors.secondaryColor,
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
        emptyContainer: {
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          gap: 10,
        },
        emptyText: {
          flex: 0,
          fontSize: 20,
          fontFamily: 'Roboto',
        },
        actionsContainer: {
          flexDirection: 'row',
          gap: 10,
        },
      })

}