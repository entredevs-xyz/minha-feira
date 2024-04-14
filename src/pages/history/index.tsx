import { FairModel } from '@/data/fair/model'
import { useFairService } from '@/data/fair/service'
import { useAppTheme } from '@/theme'
import { useEffect, useState } from 'react'
import { Button, ScrollView, View } from 'react-native'
import { Icon, List, Text } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RouteProps } from '@/router/routes'
import { useStyles } from './styles'

const FairHistory: React.FC<RouteProps> = ({ navigation }: RouteProps) => {
  const { colors } = useAppTheme()
  const styles = useStyles()
  const [currentFairs, setCurrentFairs] = useState<FairModel[]>()
  const { getAll, remove } = useFairService()

  useEffect(() => {
    getAll().then((res) => {
      setCurrentFairs(res)
    })
  }, [getAll])

  const handlerRemoveItem = async (id: number) => {
    await remove(id)
    getAll().then((res) => {
      setCurrentFairs(res ?? [])
    })
  }

  const handlerGoBack = () => {
    navigation.navigate('Dashboard')
  }

  const handlerEdit = (id: number) => {
    navigation.navigate('NewFair', { id })
  }

  return (
    <View style={styles.container}>
      {!currentFairs?.length ? (
        <View style={styles.emptyContainer}>
          <Icon
            source="vector-combine"
            size={50}
            color={colors.secondaryColor}
          />
          <Text style={styles.emptyText}>Nenhuma feira cadastrada</Text>
          <Button
            color={colors.secondaryColor}
            onPress={handlerGoBack}
            title="Voltar"
          ></Button>
        </View>
      ) : null}
      {currentFairs?.length ? (
        <ScrollView style={styles.scrollViewContainer}>
          {currentFairs?.map((item) => (
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
                  {item.id} - {item.name}
                </Text>
              )}
              description={(props) => (
                <Text
                  {...props}
                  style={styles.itemValue}
                >{`${item.createdAt.toLocaleDateString('pt-br')}`}</Text>
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
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handlerEdit(item.id)}
                  >
                    <List.Icon
                      {...props}
                      style={{
                        ...props.style,
                      }}
                      color={colors.fourthColor}
                      icon="pencil"
                    />
                  </TouchableOpacity>
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
                </View>
              )}
            />
          ))}
        </ScrollView>
      ) : null}
    </View>
  )
}

export default FairHistory
