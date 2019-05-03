import { StyleSheet } from 'react-native'
import Colors from '../../consts/Colors';

export default styles = StyleSheet.create({
    componentContainer: {
        width: 200,
        height: 150,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 15,
        right: 15
    },
    choicesContainer: {
        height: 100,
        width: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    choiceButton: {
        borderRadius: 15,
        height: 30,
        backgroundColor: Colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    floatingButton: {
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "flex-end"
    },
    choiceText: {
        color: 'white'
    }
})
