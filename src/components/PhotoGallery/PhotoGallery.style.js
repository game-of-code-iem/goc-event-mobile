import { StyleSheet, Dimensions } from "react-native"

const headerHeight = 80
const window = Dimensions.get('window')

export default styles = StyleSheet.create({
    photoContainer: {
    },
    headerContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        height: headerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: 'row'
    },
    backButton: {
        height: headerHeight,
        width: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    backLabel: {
        color: 'white'
    },
    displayCommentButton: {
        width: window.width,
        height: 50
    }
})
