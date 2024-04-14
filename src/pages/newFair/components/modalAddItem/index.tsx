import { FairItemCreateDto } from '@/data/fairItem/dto/index.dto'
import { useAppTheme } from '@/theme'
import { useState } from 'react'
import { View } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'
import { useStyles } from './styles'
import { isEmpty } from 'lodash'

const componentsMode = 'outlined'

interface ModalAddItemProps {
  onSaveItem: (item: FairItemCreateDto[]) => void
}
const ModalAddItem: React.FC<ModalAddItemProps> = ({ onSaveItem }) => {
  const { colors } = useAppTheme()
  const styles = useStyles()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState('')
  const [brand, setBrand] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('')


  console.log("loop detector", "ModalAddItem")

  const addAmountHandler = (valueToSum: number) => {
    setAmount((amount) => {
      const newAmount = amount + valueToSum
      if (newAmount < 1) return 1
      return newAmount
    })
  }

  const handlerSave = () => {
    const nameTrim = name.trim()
    const brandTrim = brand.trim()
    const weightTrim = weight.trim()
    const unitTrim = unit.trim()
    const priceString = isEmpty(price) ? '0' : price
    const itemArray = new Array(amount)
    const itemArrayFilled = itemArray.fill({
      name: nameTrim,
      price: priceString,
      brand: brandTrim,
      weight: weightTrim,
      unit: unitTrim,
    })
    if (onSaveItem) onSaveItem(itemArrayFilled)
  }

  return (
    <View style={styles.container}>
      <Text variant="titleSmall" style={styles.label}>
        Nome
      </Text>
      <TextInput
        outlineColor={colors.onPrimaryColor}
        selectionColor={colors.secondaryColor}
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
        selectionColor={colors.secondaryColor}
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
        Detalhes:
      </Text>
      <View style={styles.groupContainer}>
        <TextInput
          outlineColor={colors.onPrimaryColor}
          selectionColor={colors.secondaryColor}
          textColor={colors.secondaryColor}
          activeOutlineColor={colors.secondaryColor}
          placeholderTextColor={colors.onPrimaryColor + '90'}
          style={styles.amountTextInput}
          mode={componentsMode}
          placeholder="Marca"
          value={`${brand}`}
          onChangeText={(brand) => setBrand(brand)}
        />
        <TextInput
          outlineColor={colors.onPrimaryColor}
          selectionColor={colors.secondaryColor}
          textColor={colors.secondaryColor}
          activeOutlineColor={colors.secondaryColor}
          cursorColor={colors.secondaryColor}
          placeholderTextColor={colors.onPrimaryColor + '90'}
          style={styles.amountTextInput}
          mode={componentsMode}
          placeholder='Peso'
          keyboardType="numeric"
          value={`${weight}`}
          onChangeText={(weight) => setWeight(weight)}
        />
        <TextInput
          outlineColor={colors.onPrimaryColor}
          selectionColor={colors.secondaryColor}
          textColor={colors.secondaryColor}
          activeOutlineColor={colors.secondaryColor}
          placeholderTextColor={colors.onPrimaryColor + '90'}
          style={styles.amountTextInput}
          mode={componentsMode}
          placeholder='Unidade'
          value={`${unit}`}
          onChangeText={(unit) => setUnit(unit)}
        />
      </View>
      <Text variant="titleSmall" style={styles.label}>
        Quantidade:
      </Text>
      <View style={styles.groupContainer}>
        <TextInput
          outlineColor={colors.onPrimaryColor}
          selectionColor={colors.secondaryColor}
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


export default ModalAddItem
