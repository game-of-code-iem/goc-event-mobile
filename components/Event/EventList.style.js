import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        margin: 8,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        flex: 10
    },
    containerRev: {
        margin: 8,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row-reverse",
        flex: 10
    },
    image: {
        width: 64,
        height: 64,
        marginRight: 12,
        flex: 2
    },
    imageRev: {
        width: 64,
        height: 64,
        marginLeft: 12
    },
    containerText: {
        display: "flex",
        flexDirection: "column",
        flex: 8
    },
    titleCode: {
        display: "flex",
        flexDirection: "row",
    },
    title: {
        fontSize: 14,
        marginRight: 5,
        fontWeight: "bold"
    }
});