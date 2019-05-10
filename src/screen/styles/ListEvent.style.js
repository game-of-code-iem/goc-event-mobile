import { StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const window = Dimensions.get('window')

export default styles = StyleSheet.create({
    topBarIcon: {
        paddingRight: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    listEventContainer: {
        height: window.height - Header.HEIGHT - getStatusBarHeight()
    },
    floatingButton: {
        marginBottom: 25
    }
})
