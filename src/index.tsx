import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { useFonts } from 'expo-font';
import { useTheme, Button, Surface } from 'react-native-paper'
import { ThemeColors } from './theme';
import superMarket from '../assets/images/super-market2.jpg'
import LineChartComp from './components/lineChart'

const AppStart = () => {

    const colors = useTheme().colors as ThemeColors
    const styles = getStyles(colors)
    const [loaded] = useFonts({
        Roboto: require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
        Bebas: require('../assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf')
    });

    return (<View style={styles.container}>
        <StatusBar style="auto" backgroundColor={colors.background} />
        <ImageBackground source={superMarket} style={styles.viewUp}>
            {/* <Text style={{color:colors.textColor, alignSelf:'center', fontSize:50, backgroundColor:'#ffffff'}}>Minha Feira</Text> */}
        </ImageBackground>
        <View style={styles.viewDown}>
            <Surface style={styles.media} accessibilityStates="Media">
                <Text style={styles.mediaTitle}>PREÇO MEDIO:</Text>
                <View style={styles.mediaValue}>
                    <Text style={styles.mediaSufix}>R$</Text>
                    <Text style={styles.mediaPrice}>500,00</Text>
                </View>
            </Surface>
            <Surface accessibilityStates="Grafico" style={styles.LineChart}>
                <LineChartComp labels={['janeiro', 'fevereiro', 'março']} data={[400, 500, 300]} />
            </Surface>
            <View style={styles.viewButtons}>
                <Button style={styles.buttons} labelStyle={styles.buttonsLabel} mode="contained" accessibilityStates="Nova Feira" icon="cart-plus" onPress={() => { console.log('aqui') }} > Nova Feira </Button>
                <Button style={styles.buttons} labelStyle={styles.buttonsLabel} mode="contained" accessibilityStates="Historico" icon="cart-outline" onPress={() => { console.log('aqui') }} > Histórico</Button>
            </View>
            <View style={styles.footer}>
                <Text style={styles.marca}>Powered by - Margem Cientifica.</Text>
            </View>
        </View>
    </View>)

}



const getStyles = (colors: ThemeColors) => (StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        elevation:25
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: colors.primary,
    },
    buttons: {
        margin: 5,
        color:colors.textColor,
    },
    buttonsLabel:{
        color:colors.textColor
    },
    viewUp: {
        flex: 0,
        height: 290,
        width: '100%',
        justifyContent:'center',
        backgroundColor: '#fff',
    },
    viewDown: {
        flex: 1,
        marginTop: -70,
        width: '100%',
        backgroundColor: colors.background,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'center'
    },
    viewButtons: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    LineChart: {
        backgroundColor: colors.primary,
        width: '95%',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        elevation: 10,
        marginBottom: 20,
        alignSelf: 'center'
    },
    marca: {
        textAlign: 'center',
        color: colors.textColor,
        textShadowColor: colors.textColor,
    },
    media: {
        width: '95%',
        height: 100,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: colors.primary,
        padding: 10,
        elevation:10
    },
    mediaTitle: {
        fontSize: 10,
        fontFamily: 'Roboto',
        color:colors.textColor, 
    },
    mediaPrice: {
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Roboto',
        color:colors.textColor, 
    },
    mediaValue:{
        color:colors.textColor, 
        flexDirection:'row', 
        justifyContent:'center'
    },
    mediaSufix:{
        color:colors.textColor, 
        paddingTop:10
    }, 
    footer:{ 
        height: 20, 
        width: '100%', 
        position: 'absolute', 
        bottom: 0 
    }
}));


export default AppStart 