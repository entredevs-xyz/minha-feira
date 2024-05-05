import React, { useCallback, useMemo } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, TouchableOpacity, Appearance } from 'react-native'
import { Icon, Surface } from 'react-native-paper'
import LineChartComp from '@/components/lineChart'
import { RouteProps } from '@/router/routes'
import { useFairService } from '@/data/fair/service'
import { getRandomPhrase } from './util'
import { useStyles } from './styles'
import { useAppTheme } from '@/theme'
import { FairModel } from '@/data/fair/model'
import { orderBy, takeRight, uniq } from 'lodash'
import { dateToLocaleString, getFairsPriceByMoths } from '@/appUtils'
import { useFocusEffect } from '@react-navigation/native'


const Dashboard: React.FC<RouteProps> = ({ navigation }) => {

  const styles = useStyles()
  const { colors } = useAppTheme()
  const [currentPhrase] = React.useState(getRandomPhrase())
  const [fairs, setFairs] = React.useState<FairModel[]>([])

  const { getAll } = useFairService()

  console.log("loop detector", "Dashboard")

  const handlerNewFair = () => {
    navigation.navigate('NewFair')
  }

  const handlerFairHistory = () => {
    navigation.navigate('FairHistory')
  }



  const handlerRefresh = useCallback(() => {
    getAll().then((allFairs) => {
      setFairs(allFairs)
    }).catch((err) => {
      console.log('fairService error: ', err)
    })
  }, [getAll])

  const changeTheme = useCallback(() => {
    const currentTheme = Appearance.getColorScheme()
    const newCurrentTheme = currentTheme === 'dark' ? 'light' : 'dark'
    Appearance.setColorScheme(newCurrentTheme)

  }, [])

  useFocusEffect(handlerRefresh)

  const months = useMemo(() => {
    const _months = orderBy(fairs, "date").map(fair => {
      const date = new Date(fair.date);
      const monthName = dateToLocaleString(date);
      return monthName
    });
    return takeRight(uniq(_months), 12)
  }, [fairs]);

  const monthsPrice = useMemo(() => {

    const fairPriceByMonth = getFairsPriceByMoths(fairs)
    const _months = months.map(month => {
      const monthPrice = fairPriceByMonth.filter(fair => fair.month === month).reduce((acc, item) => acc + item.price, 0)
      return monthPrice
    })
    return takeRight(_months, 12)
  }, [fairs, months])

  const averagePrice = useMemo(() => {
    if (fairs.length === 0) return 0

    const fairPriceByMonth = getFairsPriceByMoths(fairs)

    let totalPrice = 0
    fairPriceByMonth.forEach(fair => {
      totalPrice += fair.price
    })

    if (totalPrice === 0) return 0
    if (fairPriceByMonth.length === 0) return 0

    return (totalPrice / fairPriceByMonth.length).toFixed(2)
  }, [fairs])

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <View style={styles.viewUp}>
        <TouchableOpacity
          style={styles.theme}
          onPress={changeTheme}>
          <Icon
            source="theme-light-dark"
            color={colors.primaryColor}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.welcome}>&apos;{currentPhrase}&apos;</Text>
      </View>
      <View style={styles.viewDown}>
        <Surface style={styles.media}>
          <TouchableOpacity
            style={styles.refresh}
            onPress={handlerRefresh}>
            <Icon
              source="refresh"
              color={colors.onPrimaryColor}
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.mediaTitle}>PREÇO MEDIO:</Text>
          <View style={styles.mediaValue}>
            <Text style={styles.mediaSufix}>R$</Text>
            <Text style={styles.mediaPrice}>{averagePrice}</Text>
          </View>
        </Surface>
        <Surface style={styles.lineChart}>
          <LineChartComp
            labels={months}
            data={monthsPrice}
          />
        </Surface>
        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={handlerNewFair}
          >
            <Icon source={"cart-plus"} size={30} color={colors.onSecondaryColor} />
            <Text style={styles.buttonsLabel}>
              Nova Feira
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={handlerFairHistory}
          >
            <Icon source={"cart-outline"} size={30} color={colors.onSecondaryColor} />
            <Text style={styles.buttonsLabel}>
              Histórico
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => { }}
          >
            <Icon source={"calculator"} size={30} color={colors.onSecondaryColor} />
            <Text style={styles.buttonsLabel}>
              Calculadora
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.marca}>Powered by - Margem Cientifica.</Text>
        </View>
      </View>
    </View>
  )
}



export default Dashboard
