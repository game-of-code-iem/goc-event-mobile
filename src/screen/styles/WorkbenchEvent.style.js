import { StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Colors from '../../consts/Colors';

export default styles = StyleSheet.create({
    workbenchContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        height: Dimensions.get('window').width - Header.HEIGHT - getStatusBarHeight(),
        justifyContent: 'space-between'
    },
    workbenchInfoHeader: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    infoHeaderImage: {
        overflow: 'hidden',
        width: 100,
        height: 100,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'black',
        alignSelf: 'flex-start'
    },
    infoHeaderInputs: {
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    submitForm: {
        width: Dimensions.get('window').width,
        alignSelf: 'flex-end',
        height: 70
    },
    userNames: {
        padding: 6
    },
    userResultBox: {
        maxHeight: 115
    },
    selectedUserItem: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: window.width
    },
    selectedUserItemView: {
        display: 'flex',
        flexDirection: 'row',
        width: window.width,
        justifyContent: 'space-between'
    },
    selectedGuestsBox: {
        height: 130,
        backgroundColor: 'lightgrey'
    },
    addUnsubscribedUser: {
        fontWeight: 'bold'
    },
    titleGuests: {
        color: Colors.primary,
        fontSize: 18,
        padding: 8
    },
    nobodyFound: {
        padding: 8,
        fontStyle: 'italic'
    }
})
