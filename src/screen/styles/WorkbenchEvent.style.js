import { StyleSheet, Dimensions } from 'react-native'
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Colors from '../../consts/Colors';

export default styles = StyleSheet.create({
    workbenchContainer: {
        flex: 1,
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
    dateView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateTouchable: {
        borderRadius: 4,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 3,
        padding: 8,
        flex: 1,
        marginLeft: 10
    },
    dateValue: {

    },
    infoHeaderInputs: {
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    descriptionView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: window.width,
        marginLeft: 15,
        marginRight: 15
    },
    descriptionInput: {
        maxHeight: 80
    },
    buttonBottom: {
        display: 'flex',
        flexDirection: 'row'
    },
    submitForm: {
        width: Dimensions.get('window').width / 2,
        height: 70,
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
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    guestsComponent: {
        flex: 1,
        width: window.width,
    },
    selectedGuestsBox: {
        flex: 100,
        margin: 8,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 3,
        padding: 8
    },
    flatlistSelected: {
        width: window.width,
    },
    addUnsubscribedUser: {
        fontWeight: 'bold'
    },
    titleGuests: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        padding: 8
    },
    nobodyBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        width: window.width - 80
    },
    nobodyFound: {
        padding: 8,
        fontStyle: 'italic',
        fontSize: 22,
        textAlign: "center"
    }
})
