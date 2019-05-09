import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../consts/Colors';

export default styles = StyleSheet.create({
    logoContainer: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    screenContainer: {
        flex: 1,
        height: Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    loadingTitle: {
        fontSize: 28,
        color: Colors.primary
    }
})
