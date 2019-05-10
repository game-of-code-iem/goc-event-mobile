import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        margin: 8,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        flex: 10,
    },
    imageContainer: {
        flex: 3,
        maxWidth: 96,
        maxHeight: 96,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 5,
        overflow: "visible",
        marginRight: 12
    },
    image: {
        width: 96,
        height: 96,
        borderRadius: 5
    },
    containerText: {
        display: "flex",
        flexDirection: "column",
        flex: 7
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row"
    },
    badgeGuestsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: 200,
        flex: 10
    },
    badgeCode: {
        flex: 7
    },
    guestCount: {
        marginLeft: 18,
        fontSize: 13
    },
    guestIcon: {
        marginLeft: 3
    },
    title: {
        fontSize: 14,
        marginRight: 5,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14
    }
});