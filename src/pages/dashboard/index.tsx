import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Button, Surface } from 'react-native-paper'
import { AppThemeColors, useAppTheme } from '@/theme'
import superMarket from '@/assets/images/super-market2.jpg'
import LineChartComp from '@/components/lineChart'
import { RouteProps } from '@/router/routes'
import { useFairService } from '@/data/fair/service'

const Dashboard = ({ navigation }: RouteProps) => {
  const { colors } = useAppTheme()
  const styles = getStyles(colors)

  const { getAll } = useFairService()

  const handlerNewFair = () => {
    navigation.navigate('NewFair')
  }

  const handlerFairHistory = () => {
    navigation.navigate('FairHistory')
  }

  useEffect(() => {
    getAll().catch((err) => {
      console.log('fairService error: ', err)
    })
  }, [getAll])

  return (
    <View style={styles.container}>
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
            <Text style={styles.mediaPrice}>500,00</Text>
          </View>
        </Surface>
        <Surface style={styles.LineChart}>
          <LineChartComp
            labels={['janeiro', 'fevereiro', 'março']}
            data={[400, 500, 300]}
          />
        </Surface>
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
      backgroundColor: colors.primaryColor,
      elevation: 25,
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
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      justifyContent: 'center',
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
