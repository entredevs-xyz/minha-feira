import { FairItemCreateDto } from '@/data/fairItem/dto/index.dto'
import { AppThemeColors, useAppTheme } from '@/theme'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'

const componentsMode = 'outlined'

interface ModalAddItemProps {
  onSaveItem: (item: FairItemCreateDto[]) => void
}
const ModalAddItem: React.FC<ModalAddItemProps> = ({ onSaveItem }) => {
  const { colors } = useAppTheme()
  const styles = getStyles(colors)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState('')

  const addAmountHandler = (valueToSum: number) => {
    setAmount((amount) => {
      const newAmount = amount + valueToSum
      if (newAmount < 1) return 1
      return newAmount
    })
  }

  const handlerSave = () => {
    const nameTrim = name.trim()
    const itemArray = new Array(amount)
    const itemArrayFilled = itemArray.fill({ name: nameTrim, price })
    if (onSaveItem) onSaveItem(itemArrayFilled)
  }

  return (
    <View style={styles.container}>
      <Text variant="titleSmall" style={styles.label}>
        Nome
      </Text>
      <TextInput
        outlineColor={colors.onPrimaryColor}
        selectionColor={colors.primaryColor}
        textColor={colors.secondaryColor}
        activeOutlineColor={colors.secondaryColor}
        style={styles.description}
        mode={componentsMode}
        label=""
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text variant="titleSmall" style={styles.label}>
        Valor
      </Text>
      <TextInput
        outlineColor={colors.onPrimaryColor}
        selectionColor={colors.primaryColor}
        textColor={colors.secondaryColor}
        activeOutlineColor={colors.secondaryColor}
        style={styles.description}
        mode={componentsMode}
        keyboardType="numeric"
        label=""
        value={`${price}`}
        onChangeText={(price) => {
          setPrice(price.replace(',', '.'))
        }}
      />
      <Text variant="titleSmall" style={styles.label}>
        Quantidade:
      </Text>
      <View style={styles.amountContainer}>
        <TextInput
          outlineColor={colors.onPrimaryColor}
          selectionColor={colors.primaryColor}
          textColor={colors.secondaryColor}
          activeOutlineColor={colors.secondaryColor}
          style={styles.amountTextInput}
          mode={componentsMode}
          label=""
          keyboardType="numeric"
          value={`${amount}`}
          onChangeText={(amount) => setAmount(+amount)}
        />
        <Button
          style={styles.addAmountButton}
          textColor={colors.onPrimaryColor}
          mode={'elevated'}
          onPress={() => addAmountHandler(1)}
        >
          {'+'}
        </Button>
        <Button
          style={styles.decrementAmountButton}
          textColor={colors.onFourthColor}
          mode={'elevated'}
          onPress={() => addAmountHandler(-1)}
        >
          {'-'}
        </Button>
      </View>
      <Button
        style={styles.saveButton}
        textColor={colors.onPrimaryColor}
        icon="content-save"
        mode={'elevated'}
        onPress={handlerSave}
      >
        Salvar
      </Button>
    </View>
  )
}

const getStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
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
    },
    amountContainer: {
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
    },
    addAmountButton: {
      flex: 0,
      backgroundColor: colors.primaryColor,
    },
    decrementAmountButton: {
      flex: 0,
      backgroundColor: colors.fourthColor,
    },
    label: {
      textAlign: 'left',
      width: '100%',
      color: colors.onSecondaryColor,
    },
    saveButton: {
      flex: 0,
      width: '90%',
      marginTop: 25,
      backgroundColor: colors.primaryColor,
    },
  })

export default ModalAddItem
