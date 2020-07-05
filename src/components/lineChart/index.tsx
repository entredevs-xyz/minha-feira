import React, { Props } from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from "react-native-chart-kit";
import { useTheme } from 'react-native-paper';
import { ThemeColors } from '../../theme';

export interface LineChartProps extends Props<any>{
    data:number[]
    labels:string[]
}

const LineChartComp:React.FC<LineChartProps> = ({labels,data}) =>{

    const colors = useTheme().colors as ThemeColors

    return ( <LineChart
                data={{
                    labels,
                    datasets: [
                        {data}
                    ]
                }}
                width={Dimensions.get("window").width - 50} // from react-native
                height={220}
                yAxisLabel="R$"
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: colors.primary,
                    backgroundGradientFrom: colors.primary,
                    backgroundGradientTo: colors.primary,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `${colors.textColor}`,
                    labelColor: (opacity = 1) =>  `${colors.textColor}`,
                    style: {
                        borderRadius: 5,
                        paddingLeft:10

                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                } as any}
                bezier={true}
                style={{
                    marginVertical: 8,
                    borderRadius: 5,
                }}
            />
    ) as any


}


export default LineChartComp