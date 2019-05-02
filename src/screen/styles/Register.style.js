import { StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const window = Dimensions.get('window')

export default styles = StyleSheet.create({
    registerContainer: {
        height: window.height - Header.HEIGHT - getStatusBarHeight(),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    formInput: {
        width: window.width - 50
    },
    formContainer: {
        paddingTop: 10,
        width: window.width,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center'
    },
    submitForm: {
        width: window.width,
        height: 70
    }
})
