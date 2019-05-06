import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../consts/Colors';
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { bold, white } from 'ansi-colors';

const window = Dimensions.get('window')

const globalHeight = window.height - Header.HEIGHT - getStatusBarHeight()

export default styles = StyleSheet.create({

    page: {
        height: globalHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    screenContainer: {
        display: "flex",
        flexDirection: "column",
    },
    textContainer: {
        padding: 10
    },
    bottomSigninButton: {
        alignSelf: "flex-end",
    },
    signinButton: {
        width: window.width,
        height: 50
    },
    title: {
        fontSize: 30,
        color: Colors.primary,
        marginBottom: 10
    },
    lieuText: {
        marginBottom: 20
    },
    descriptionText: {
        marginTop: 20,
        textAlign: "justify"
    },
    guestList: {
        width: 150,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 20
    },
    picsTitle: {
        fontSize: 18,
        color: Colors.primary,
        marginTop: 10,
        fontWeight: "bold"
    },
    picsList: {
        width: window.width - 90,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    arrowIcon: {
        paddingLeft: 0
    },
    arrowIconPic: {
        height: 100,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})