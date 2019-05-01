import React from 'react'
import {Image, View} from 'react-native'
import {RkText} from 'react-native-ui-kitten'
import styles from './EventList.style'
//Components
import EventBadge from './EventBadge'

class EventItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        //console.log("rendering props", this.props)
        return(
            <View key={this.props.event.id} style={this.props.type == "reversed" ? styles.containerRev : styles.container}>
                <Image 
                    style={this.props.type == "reversed" ? styles.imageRev : styles.image}
                    source={{uri: this.props.event.image}} />
                <View style={styles.containerText}>
                    <View style={styles.titleCode}>
                        <RkText style={styles.title}>{this.props.event.title}</RkText>
                        <EventBadge text={this.props.event.inviteCode} position="normal" type="primary" />
                    </View>
                    <RkText>{this.props.event.description}</RkText>
                </View>
                
            </View>
        )
    }
}


/*
    
*/
export default EventItem