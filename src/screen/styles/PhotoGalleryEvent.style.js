import { StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default styles = StyleSheet.create({
    topBarIcon: {
        paddingRight: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    floatingButton: {
        marginBottom: 25
    },
    galleryContainer: {
        height: Dimensions.get('window').height - Header.HEIGHT - getStatusBarHeight()
    }

})