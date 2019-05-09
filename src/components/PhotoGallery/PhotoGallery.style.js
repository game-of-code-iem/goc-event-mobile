import { StyleSheet, Dimensions } from "react-native"

const headerHeight = 80
const window = Dimensions.get('window')

export default styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
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
        width: window.width / 2,
        height: 50
    },
    galleryFooter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        width: window.width,
        backgroundColor: "rgba(0, 0, 0, 0.8)"
    }
})
