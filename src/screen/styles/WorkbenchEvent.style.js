import { StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default styles = StyleSheet.create({
    workbenchContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        height: Dimensions.get('window').width - getStatusBarHeight() - Header.HEIGHT
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
        padding:4
    },
    userResultBox: {
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: 'black'
    },
    selectedUserItem: {
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectedGuestsBox: {
        height: 150,
        backgroundColor: 'lightgrey'
    }
})
