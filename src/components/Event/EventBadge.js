import React from 'react'
import { View, Text } from 'react-native'

class EventBadge extends React.Component {
    render() {
        return (
            <View style={{
                borderRadius: 4,
                backgroundColor: this.props.type == "primary" ? "#397edc" :
                    this.props.type == "success" ? "#22c93d" :
                        this.props.type == "danger" ? "#ed1c4d" :
                            this.props.type == "warning" ? "#feb401" :
                                this.props.type == "unavailable" ? "#424242"
                                    : "#ececec",
                height: 20,
                paddingLeft: 3,
                paddingRight: 3,
                position: this.props.position == "top" ? "absolute" : "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    color: this.props.type == "primary" || this.props.type == "success" || this.props.type == "unavailable" || this.props.type == "danger" ? "white" :
                        "",
                    fontSize: 11
                }}>{this.props.text}</Text>
            </View>
        )
    }
}

export default EventBadge