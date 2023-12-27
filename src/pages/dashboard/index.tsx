import React, { useCallback, useEffect, useMemo } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Button, Icon, Surface } from 'react-native-paper'
import { AppThemeColors, useAppTheme } from '@/theme'
import superMarket from '@/assets/images/super-market2.jpg'
import LineChartComp from '@/components/lineChart'
import { RouteProps } from '@/router/routes'
import { useFairService } from '@/data/fair/service'
import { FairModel } from '@/data/fair/model'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { orderBy, takeRight, uniq } from 'lodash'

const Dashboard = ({ navigation }: RouteProps) => {
  const { colors } = useAppTheme()
  const styles = getStyles(colors)
  const [fairs, setFairs] = React.useState<FairModel[]>([])

  const { getAll } = useFairService()

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

  useEffect(() => {
    handlerRefresh()
  }, [handlerRefresh])

  const months = useMemo(() => {
    const _months = orderBy(fairs, "createdAt").map(fair => {
      const date = new Date(fair.createdAt);
      const monthName = date.toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
      return monthName
    });
    return takeRight(uniq(_months), 12)
  }, [fairs]);

  const monthsPrice = useMemo(() => {
    const fairsAndMonth = orderBy(fairs, "createdAt").map(fair => ({
      month: new Date(fair.createdAt).toLocaleString('pt-BR', { month: 'short', year: '2-digit' }),
      price: fair.fairList?.reduce((acc, item) => acc + item.price, 0) ?? 0
    }))
    const _months = months.map(month => {
      const monthPrice = fairsAndMonth.filter(fair => fair.month === month).reduce((acc, item) => acc + item.price, 0)
      return monthPrice
    })
    return takeRight(_months, 12)
  }, [fairs, months])

  const averagePrice = useMemo(() => {
    let totalPrice = 0
    fairs.forEach((fair) => {
      let totalPriceItems = 0
      fair.fairList?.forEach((item) => {
        totalPriceItems += item.price
      })
      totalPrice += totalPriceItems
    })
    if (totalPrice === 0) return 0
    if (fairs.length === 0) return 0
    return (totalPrice / fairs.length).toFixed(2)
  }, [fairs])

  return (
    <View style={styles.container}>
      <View style={styles.refresh}>
        <TouchableOpacity
          onPress={handlerRefresh}>
          <Icon
            source="refresh"
            color={colors.onPrimaryColor}
            size={40}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <ImageBackground
        source={superMarket}
        style={styles.viewUp}
      ></ImageBackground>
      <View style={styles.viewDown}>
        <Surface style={styles.media}>
          <Text style={styles.mediaTitle}>PREÇO MEDIO:</Text>
          <View style={styles.mediaValue}>
            <Text style={styles.mediaSufix}>R$</Text>
            <Text style={styles.mediaPrice}>{averagePrice}</Text>
          </View>
        </Surface>
        {/* <Surface style={styles.LineChart}>
          <LineChartComp
            labels={months}
            data={monthsPrice}
          />
        </Surface> */}
        <View style={styles.viewButtons}>
          <Button
            style={styles.buttons}
            labelStyle={styles.buttonsLabel}
            mode="elevated"
            icon="cart-plus"
            onPress={handlerNewFair}
          >
            {' '}
            Nova Feira{' '}
          </Button>
          <Button
            style={styles.buttons}
            labelStyle={styles.buttonsLabel}
            mode="elevated"
            icon="cart-outline"
            onPress={handlerFairHistory}
          >
            {' '}
            Histórico
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.marca}>Powered by - Margem Cientifica.</Text>
        </View>
      </View>
    </View>
  )
}

const getStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: colors.primaryColor,
      backgroundColor: 'red',
      elevation: 25,
    },
    refresh: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
      backgroundColor: colors.primaryColor,
      borderRadius: 15,
      elevation: 10,
    },
    buttons: {
      margin: 5,
      backgroundColor: colors.secondaryColor,
      color: colors.onSecondary,
    },
    buttonsLabel: {
      color: colors.onSecondary,
    },
    viewUp: {
      flex: 0,
      height: 290,
      width: '100%',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    viewDown: {
      flex: 1,
      marginTop: -70,
      width: '100%',
      backgroundColor: colors.primaryColor,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 20,
      justifyContent: 'flex-start',
    },
    viewButtons: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    LineChart: {
      backgroundColor: colors.secondaryColor,
      width: '95%',
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 10,
      elevation: 10,
      marginBottom: 20,
      alignSelf: 'center',
    },
    marca: {
      textAlign: 'center',
      color: colors.onPrimaryColor,
      textShadowColor: colors.onPrimaryColor,
    },
    media: {
      width: '95%',
      height: 100,
      alignSelf: 'center',
      borderRadius: 10,
      marginBottom: 15,
      backgroundColor: colors.secondaryColor,
      padding: 10,
      elevation: 10,
    },
    mediaTitle: {
      fontSize: 10,
      fontFamily: 'Roboto',
      color: colors.onSecondary,
    },
    mediaPrice: {
      textAlign: 'center',
      fontSize: 50,
      fontFamily: 'Roboto',
      color: colors.onSecondary,
    },
    mediaValue: {
      color: colors.onSecondary,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    mediaSufix: {
      color: colors.onSecondary,
      paddingTop: 10,
    },
    footer: {
      height: 20,
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
  })

export default Dashboard
