import React from 'react'
import { Image, View } from 'react-native'
import { RkText } from 'react-native-ui-kitten'
import styles from './EventList.style'
import Icon from 'react-native-vector-icons/FontAwesome';
//Components
import EventBadge from './EventBadge'
//Consts
import Colors from "../../consts/Colors";

class EventItem extends React.Component {
    constructor(props) {
        super(props)
    }

    truncateDesc(str) {
        if (str.length >= 55) {
            return str.substring(0, 54) + "...";
        }
        return str;
    }

    renderBadge() {
        let type = ""
        switch (this.props.event.status) {
            case "OPEN":
                type = "success"
                break;
            case "PREPARING":
                type = "warning"
                break;
            case "ENDED":
                type = "danger"
                break;
            case "UNAVAILABLE":
                type = "unavailable"
                break;
        }

        return <EventBadge style={styles.badgeCode} text={this.props.event.inviteCode} position="normal" type={type} />
    }

    render() {
        //console.log("rendering props", this.props)
        return (
            <View key={this.props.event.id} style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: this.props.event.image.uri }} />
                </View>
                <View style={styles.containerText}>
                    <View style={styles.titleContainer}>
                        <RkText style={styles.title}>{this.props.event.title}</RkText>
                    </View>
                    <View style={styles.badgeGuestsContainer}>
                        {this.renderBadge()}
                        <RkText style={styles.guestCount}>{this.props.event.guests.length}</RkText>
                        <Icon style={styles.guestIcon} color={Colors.primary} name="users" size={11} />
                    </View>
                    <RkText style={styles.description}>{this.truncateDesc(this.props.event.description)}</RkText>
                </View>
                {
                    // HORIZONTAL RULE
                }
                <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
                />
            </View>
        )
    }
}


/*
    
*/
export default EventItem