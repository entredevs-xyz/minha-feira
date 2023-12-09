import { FairModel } from '@/data/fair/model'
import { useFairService } from '@/data/fair/service'
import { AppThemeColors, useAppTheme } from '@/theme'
import { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, View } from 'react-native'
import { Icon, List, Text } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RouteProps } from '@/router/routes'

const FairHistory: React.FC<RouteProps> = ({ navigation }: RouteProps) => {
  const { colors } = useAppTheme()
  const styles = getStyles(colors)
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

const getStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: colors.primaryColor,
      elevation: 25,
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

export default FairHistory
