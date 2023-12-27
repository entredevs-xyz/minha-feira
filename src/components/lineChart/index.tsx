import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { useAppTheme } from '@/theme'
import { PropsWithChildren, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

export interface LineChartProps extends PropsWithChildren {
  data: number[]
  labels: string[]
}

const DEFAULT_CHAR_DATA = {
  labels: [''],
  datasets: [{ data: [0] }],
}

const LineChartComp: React.FC<LineChartProps> = ({ labels = [], data = [] }) => {
  const { colors } = useAppTheme()
  const [chartData, setChartData] = useState(cloneDeep(DEFAULT_CHAR_DATA))

  useEffect(() => {
    if (!labels.length || !data.length) {
      setChartData(cloneDeep(DEFAULT_CHAR_DATA))
      return
    }

    setChartData({
      labels,
      datasets: [{ data }],
    })
  }, [labels, data])


  return (
    <LineChart
      data={chartData}
      width={Dimensions.get('window').width - 50}
      height={220}
      yAxisLabel="R$"
      yAxisSuffix=""
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: colors.secondaryColor,
        backgroundGradientFrom: colors.primaryColor,
        backgroundGradientTo: colors.primaryColor,
        decimalPlaces: 2,
        color: () => `${colors.secondaryColor}`,
        labelColor: () => `${colors.secondaryColor}`,
        style: {
          borderRadius: 5,
          paddingLeft: 10,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: `${colors.onSecondaryColor}`,
        },
      }}
      bezier={true}
      style={{
        marginVertical: 8,
        borderRadius: 5,
      }}
    />
  )
}

export default LineChartComp
