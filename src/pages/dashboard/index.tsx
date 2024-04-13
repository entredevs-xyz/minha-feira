import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon, Surface } from 'react-native-paper'
import LineChartComp from '@/components/lineChart'
import { RouteProps } from '@/router/routes'
import { useFairService } from '@/data/fair/service'
import { getRandomPhrase } from './util'
import { useStyles } from './styles'
import { useAppTheme } from '@/theme'

const Dashboard = ({ navigation }: RouteProps) => {

  const styles = useStyles()
  const { colors } = useAppTheme()
  const [currentPhrase] = React.useState(getRandomPhrase())

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

      <View style={styles.viewUp}>
        <Text style={styles.welcome}>''{currentPhrase}''</Text>
      </View>
      <View style={styles.viewDown}>
        <Surface style={styles.media}>
          <Text style={styles.mediaTitle}>PREÇO MEDIO:</Text>
          <View style={styles.mediaValue}>
            <Text style={styles.mediaSufix}>R$</Text>
            <Text style={styles.mediaPrice}>500,00</Text>
          </View>
        </Surface>
        <Surface style={styles.lineChart}>
          <LineChartComp
            labels={['janeiro', 'fevereiro', 'março']}
            data={[400, 500, 300]}
          />
        </Surface>
        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={handlerNewFair}
          >
            <Icon source={"cart-plus"} size={30} color={colors.onSecondary} />
            <Text style={styles.buttonsLabel}>
              Nova Feira
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={handlerFairHistory}
          >
            <Icon source={"cart-outline"} size={30} color={colors.onSecondary} />
            <Text style={styles.buttonsLabel}>
              Histórico
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => { }}
          >
            <Icon source={"calculator"} size={30} color={colors.onSecondary} />
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
