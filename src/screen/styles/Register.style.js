import { StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const window = Dimensions.get('window')

const fullContainerHeight = window.height - Header.HEIGHT - getStatusBarHeight()

export default styles = StyleSheet.create({
    registerContainer: {
        height: fullContainerHeight,
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1
    },
    submitForm: {
        width: window.width,
        height: 70
    }
})
