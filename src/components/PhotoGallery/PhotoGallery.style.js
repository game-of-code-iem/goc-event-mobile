import { StyleSheet } from "react-native"

const headerHeight = 30

export default styles = StyleSheet.create({
    photoContainer: {
    },
    headerContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        height: headerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    backButton: {
        height: headerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    backLabel: {
        color: 'white'
    }
})
