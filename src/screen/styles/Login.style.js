import { StyleSheet, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const window = Dimensions.get('window')


export default styles = StyleSheet.create({
    page: {
        height: window.height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    screenContainer: {
        marginTop: getStatusBarHeight(),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    logoContainer: {
        width: window.width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 300
    },
    logo: {
        width: 300,
        height: 150
    },
    loginFields: {
        width: window.width - 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    loginButton: {
        marginTop: 15,
        width: 150
    },
    bottomSigninButton: {
        alignSelf: "flex-end",
    },
    signinButton: {
        width: window.width,
        height: 80
    }
})
