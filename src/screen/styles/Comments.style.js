import { StyleSheet, Dimensions } from "react-native"
import { Header } from 'react-navigation';
import Colors from '../../consts/Colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const window = Dimensions.get('window')
const globalHeight = window.height - Header.HEIGHT - getStatusBarHeight()

export default styles = StyleSheet.create({
    page: {        
        height: globalHeight,
        width: window.width,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },

    // COMMENTS LIST
    commentPart: {
        height: globalHeight - 48,
        padding: 20,
        backgroundColor: Colors.grey
    },    
    columnsComment: {        
        height: 45,
        width: window.width-20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 20
    },
    detailComment: {
        marginLeft: 10
    },
    commentName: {
        fontWeight: "bold"
    },
    commentText: {
        maxWidth: window.width - 140
    },
    likeIcon: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignSelf: "flex-end",
        flex: 1
    },
    countLikes: {
        marginRight: 4
    },

    // COMMENTS INPUT
    inputRow: {
        height: 47,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    commentInput: {
        //alignSelf: "flex-end",
        width: window.width - 130        
    },
    commentInsideInput: {
        borderBottomWidth: 0,
        padding: 5
    },
    publishButton: {
        backgroundColor: Colors.contrast,
        borderRadius: 0
    }
})
