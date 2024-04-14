import { FairModel } from '@/data/fair/model'
import { useFairService } from '@/data/fair/service'
import { useAppTheme } from '@/theme'
import { useEffect, useMemo, useState } from 'react'
import { Keyboard, Platform, ScrollView, View } from 'react-native'
import {
  TextInput,
  Button,
  Snackbar,
  Portal,
  Modal,
  List,
  Text,
} from 'react-native-paper'
import ModalAddItem from './components/modalAddItem'
import { FairItemCreateDto } from '@/data/fairItem/dto/index.dto'
import { useFairItemService } from '@/data/fairItem/service'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RouteProps } from '@/router/routes'
import { useStyles } from './styles'
import DatePicker from '@/components/datePicker'
import { FairUpdateDto } from '@/data/fair/dto/index.dto'

const componentsMode = 'outlined'

const KEYBOARD_OFFSET = Platform.OS === 'ios' ? 300 : 0

const NewFair: React.FC<RouteProps> = ({ route }) => {
  const { colors } = useAppTheme()
  const styles = useStyles()

  const [snackVisible, setSnackVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentFair, setCurrentFair] = useState<FairModel>()
  const { create, update, getById } = useFairService()
  const { create: createItem, remove: removeItem } = useFairItemService()

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState(false);
  const [search, setSearch] = useState('')

  const onToggleSnackBar = () => setSnackVisible(!snackVisible)
  const onDismissSnackBar = () => setSnackVisible(false)

  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)

  const id = route?.params?.id

  console.log("loop detector", "NewFair")

  useEffect(() => {
    if (!id) return

    getById(id).then((res) => {
      if (!res) return
      setCurrentFair(res)
      setName(res?.name ?? '')
      setDate(new Date(res?.date ?? new Date()));
    })
  }, [id, getById])

  useEffect(() => {
    if (id) return
    if (currentFair) return
    if (name) return

    const newFairDate = new Date(date ?? new Date())
    setName(`Feira ${newFairDate.toLocaleDateString("pt-BR", { month: 'long', day: 'numeric' })}`)

  }, [currentFair, date, id, name])


  const handlerUpdateFair = async () => {

    const _currentFair = await getCurrentFair()
    if (!_currentFair) return

    const updateDto: FairUpdateDto = {
      name: (name ?? "").trim(),
      date: new Date(date ?? new Date()),
    }

    update(_currentFair.id, updateDto).then((res) => {
      if (res) {
        onToggleSnackBar()
      }
    })
  }

  const handlerAddItem = () => {
    showModal()
  }

  const getCurrentFair = async () => {

    if (currentFair) return currentFair

    const newFairDate = new Date(date ?? new Date())
    const newFair = await create({
      name: (name ?? "").trim(),
      date: newFairDate,
    })
    setCurrentFair(newFair)
    return newFair

  }

  const handlerSaveItem = async (items: FairItemCreateDto[]) => {
    setModalVisible(false)

    const _currentFair = await getCurrentFair()
    if (_currentFair) {

      for (let index = 0; index < items.length; index++) {
        const item = items[index]
        await createItem(item, _currentFair)
      }

      const fair = await getById(_currentFair.id)
      if (fair) setCurrentFair(fair)
    }
  }

  const handlerRemoveItem = async (id: number) => {
    if (!currentFair) return
    await removeItem(id)
    const fair = await getById(currentFair.id)
    if (fair) setCurrentFair(fair)
  }

  const totalListValue = useMemo(() => {
    if (!currentFair) return 0
    if (!currentFair.fairList) return 0
    return currentFair.fairList?.reduce((acc, item) => {
      return acc + item.price
    }, 0).toFixed(2)
  }, [currentFair])

  useEffect(() => {
    const handlerKeyboardDidShow = () => {
      setKeyboardIsOpen(true)
    }
    const handlerKeyboardDidHide = () => {
      setKeyboardIsOpen(false)
    }
    Keyboard.addListener('keyboardDidShow', handlerKeyboardDidShow)
    Keyboard.addListener('keyboardDidHide', handlerKeyboardDidHide)
  }, [])

  const fairList = useMemo(() => {
    if (!currentFair) return []
    if (!currentFair.fairList || !currentFair.fairList.length) return []
    if (search) return [...currentFair.fairList]
      .reverse()
      .filter(item => item.name.toLowerCase()
        .includes(search.toLowerCase()))
    return [...currentFair.fairList].reverse()
  }, [currentFair, search])

  const onChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDate(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          outlineColor={colors.onPrimaryColor}
          selectionColor={colors.primaryColor}
          textColor={colors.secondaryColor}
          activeOutlineColor={colors.secondaryColor}
          style={styles.description}
          mode={componentsMode}
          label="Descrição"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Button
          style={styles.button}
          textColor={colors.onSecondaryColor}
          icon="calendar"
          mode={'elevated'}
          onPress={() => setShowDate(true)}>
          {date.toLocaleDateString("pt-BR", { month: 'numeric', day: 'numeric' })}
        </Button>
        <Button
          style={styles.button}
          textColor={colors.onSecondaryColor}
          mode={'elevated'}
          onPress={handlerUpdateFair}
        >
          Salvar
        </Button>
      </View>
      <View style={styles.addItemContainer}>
        <TextInput
          outlineColor={colors.onPrimaryColor}
          selectionColor={colors.primaryColor}
          textColor={colors.secondaryColor}
          activeOutlineColor={colors.secondaryColor}
          style={styles.description}
          mode={componentsMode}
          label="Pesquisar Item"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Button
          style={styles.button}
          textColor={colors.onSecondaryColor}
          icon="plus"
          mode={'elevated'}
          onPress={handlerAddItem}
        >
          Adicionar Item
        </Button>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {fairList.map((item) => (
          <List.Item
            theme={{
              colors: {
                primary: colors.primaryColor,
                text: colors.onPrimaryColor,
              },
            }}
            style={styles.listItem}
            key={item.id}
            title={(props) => (
              <Text {...props} style={styles.itemLabel}>
                {item.name}
              </Text>
            )}
            description={(props) => (
              <Text
                {...props}
                style={styles.itemValue}
              >{`R$ ${item.price}`}</Text>
            )}
            left={(props) => (
              <List.Icon
                {...props}
                style={{
                  ...props.style,
                }}
                color={colors.primaryColor}
                icon="check"
              />
            )}
            right={(props) => (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handlerRemoveItem(item.id)}
              >
                <List.Icon
                  {...props}
                  style={{
                    ...props.style,
                  }}
                  color={colors.fifthColor}
                  icon="delete"
                />
              </TouchableOpacity>
            )}
          />
        ))}
      </ScrollView>
      <View style={styles.summaryContainer}>
        <Text style={styles.totalLabel}>Total: </Text>
        <Text style={styles.totalValue}>{`R$ ${totalListValue}`}</Text>
      </View>
      <Portal>
        <Modal
          style={{
            marginBottom: keyboardIsOpen ? KEYBOARD_OFFSET : 0,
          }}
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalStyle}
        >
          <ModalAddItem onSaveItem={handlerSaveItem} />
        </Modal>
      </Portal>
      <Snackbar
        visible={snackVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'ok',
          onPress: () => {
            // Do something
          },
        }}
      >
        Feira Atualizada
      </Snackbar>
      <DatePicker
        date={date}
        onChange={onChange}
        showDate={showDate} />
    </View>
  )
}



export default NewFair
