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

const componentsMode = 'outlined'

const KEYBOARD_OFFSET = Platform.OS === 'ios' ? 300 : 0

const NewFair: React.FC<RouteProps> = ({ route }) => {
  const { colors } = useAppTheme()
  const styles = useStyles()
  const [name, setName] = useState('')
  const [snackVisible, setSnackVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentFair, setCurrentFair] = useState<FairModel>()
  const { create, update, getById } = useFairService()
  const { create: createItem, remove: removeItem } = useFairItemService()
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)

  const onToggleSnackBar = () => setSnackVisible(!snackVisible)
  const onDismissSnackBar = () => setSnackVisible(false)

  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)

  const id = route?.params?.id

  useEffect(() => {
    if (!id) return

    getById(id).then((res) => {
      if (!res) return
      setCurrentFair(res)
      setName(res?.name ?? '')
    })
  }, [id, getById])

  useEffect(() => {
    if (currentFair) return
    if (id) return

    create({}).then((res) => {
      setCurrentFair(res)
    })
  }, [currentFair, create, id])

  const handlerUpdateDescription = () => {
    if (!currentFair) return
    if (!name) return

    const newName = name.trim()
    update(currentFair.id, newName).then((res) => {
      if (res) {
        onToggleSnackBar()
        setCurrentFair(res)
      }
    })
  }

  const handlerAddItem = () => {
    showModal()
  }

  const handlerSaveItem = async (items: FairItemCreateDto[]) => {
    setModalVisible(false)
    if (!currentFair) return
    for (let index = 0; index < items.length; index++) {
      const item = items[index]
      await createItem(item, currentFair)
    }

    const fair = await getById(currentFair.id)
    if (fair) setCurrentFair(fair)
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
    return [...currentFair.fairList].reverse()
  }, [currentFair])

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
          icon="content-save"
          mode={'elevated'}
          onPress={handlerUpdateDescription}
        >
          Salvar
        </Button>
      </View>
      <View style={styles.addItemContainer}>
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
    </View>
  )
}



export default NewFair
