import { StyleSheet, Dimensions } from "react-native"
import { Header } from 'react-navigation';
import Colors from '../../consts/Colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const window = Dimensions.get('window')
const globalHeight = window.height - Header.HEIGHT - getStatusBarHeight()

export default styles = StyleSheet.create({
    commentInput: {
        alignSelf: "flex-end"
    },
    page: {
        padding: 20,
        height: globalHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    columnsComment: {
        height: 45,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start", //"space-evenly"
        marginBottom: 20
    },
    detailComment: {
        marginLeft: 10
    },
    commentName: {
        fontWeight: "bold"
    }
})
