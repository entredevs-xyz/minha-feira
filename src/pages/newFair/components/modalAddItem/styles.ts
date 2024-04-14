import { useAppTheme } from "@/theme"
import { StyleSheet } from "react-native"


export const useStyles = () => {

    const { colors } = useAppTheme()

    return StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'flex-start',
          backgroundColor: colors.secondaryColor,
          elevation: 25,
          padding: 10,
        },
        description: {
          flex: 0,
          width: '100%',
          fontWeight: 'bold',
          backgroundColor: colors.primaryColor,
        },
        groupContainer: {
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          gap: 10,
        },
        amountTextInput: {
          flex: 1,
          fontWeight: 'bold',
          backgroundColor: colors.primaryColor,
        },
        addAmountButton: {
          height: 55,
          justifyContent: 'center',
          borderRadius: 5,
          flex: 0,
          fontSize: 20,
          backgroundColor: colors.primaryColor,
        },
        decrementAmountButton: {
          height: 55,
          justifyContent: 'center',
          borderRadius: 5,
          flex: 0,
          backgroundColor: colors.fourthColor,
        },
        label: {
          textAlign: 'left',
          width: '100%',
          color: colors.onSecondaryColor,
        },
        saveButton: {
          height: 55,
          justifyContent: 'center',
          borderRadius: 5,
          flex: 0,
          width: '90%',
          marginTop: 25,
          backgroundColor: colors.primaryColor,
        },
      })

}