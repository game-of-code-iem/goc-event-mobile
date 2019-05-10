import React from 'react';
import { Image, View } from 'react-native';
import { RkText } from 'react-native-ui-kitten';
import styles from './EventList.style';
import Icon from 'react-native-vector-icons/FontAwesome';
//Components
import EventBadge from './EventBadge';
//Consts
import Colors from '../../consts/Colors';

const noEventImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAMcAQMAAACl5F6MAAAABlBMVEW8vsDn6OnyCdevAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEbUlEQVR4AezBMQEAAADCoPVP7WsIoAcAAAAAAAAAAAAAAAAAAAAAAIydO0iOk4eCAGyVXNEuukF0FB1NHE1H0RG0ZEHRf5A99WYMk1T+Kvolw+vVjBf+CkMLoRCFWQkuqCquB3QOOQKrCpwBKJ1i6Jxk/EzTubaArgAHQOeyjhu8aMEafUrYolLjLRMfLrpw5cMYadeBnTLcrwN7ZXi+DhyuCi8GG/xy8Gyw3SRe7n7cLzfnajah5z87keFJ//lYf0WAAq+vv+rDX+fir+zpr2Xqr95qrle/ywr9OxX+/nF19fGRmR/yrzCJCudRqNHiNDHhIlquTBgCF2aX3V2BwYT9nUYdNoNojnqjiKJ56q0xiRaok4EsWqQO2EW0RJ3wQbTMvDc6iFaYswEvkx5Hnf8E0Tx1xhcfj3gh1lhOLHVWnx8vLvBq/FAnYpGBhwEElVfjhyETjVjj5bFanATpLrHIcpDkIstpJRdZLmRykaW63CLLMZKLLGeVXGS5jvlFluZKq8k1lnGMXGMZuck1lnsVu8ZydybXWOYj5BrLDIxcY5lz8mrML/JupPIC02osf3tyjeVqY9dYikys8QlTAUIsFovFYrFYLJaIP8hq8D4GG2ywwQYbbLDBBhtssMEGG2ywwQYb3N9+G/ePwQYbbLDBBhtssMEGG5yhA3ugqcARmFXgDKwqcAGgAsu+J1zYy94UXDjIRxosH+crwUm2euHCWX43Fy7YciUYI9N1YIeRavDpsMdIM9jgs+BOh4PBavA3ras6aMFRC06TEpyrLsy/H5emBKOrwvxZpsOsA3ssOk8SQQ9edZ4WI6DzfJwU4Ym/FCE7ofFXfQoJlnUugRsHdl9GTKBzlxRF6vzVW9kngr5eLTB5hT6MUhPgLfdDRhwQCQ79TQXe756tAWcp10XgIuMYF8aWxoedLtz5sB/wzIeDLrzw4QiRqHBSgOvnwLWFCrc7eCLCbnwrXFh2ZMdHKhEOyx3ciHBch8OHE2TtCZ0IZ0wCz1S4jhGTDhc0ecN9IcLja/qEVwIswqwC+/H3zfgMDw7j95cbPBFg+YEKnIaGWyoNzpvmcEujws0rwGX7LnCnwWOgDLhlZsFuaJEP+zFCC7yw4DCAhFtWFhwHl/lwwpeowRMJzlpw+QpXEgwl2O3gxoH9Du4cOOzgmQNHLTjt4OXF4byDVw5csAsHhhLssM/EgD32qQw4aMER+zQtuDPgpAVn7DMz4IJ9FgYMJdgdwSsB9jgKAQ5acDyEJy24ng8nLTgfwu18uBzC/XwYSrA7hmfCeyCHWU6Hw18Gr4R3fY5zOpy04PwEngj/KfYw9WwYSrB7BjfCW4qH6a8Kh2fwTHgF9jDLyXDSgvMzeKW8UX6Uk2Eowe45PL0m7J/D9VQ4aMG/isH/JwYbbLDBBhtssMEGG2ywtz3K/2tvDmQAAAAABvlbn+NbCSQWi8VisVgsFovFYrFYLBYvAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHVJjR5bJLd8AAAAASUVORK5CYII="

class EventItem extends React.Component {
	constructor(props) {
		super(props);
	}

	truncateDesc(str) {
		if (str.length >= 55) {
			return str.substring(0, 54) + '...';
		}
		return str;
	}

	renderBadge() {
		let type = '';
		switch (this.props.event.status) {
			case 'OPEN':
				type = 'success';
				break;
			case 'PREPARING':
				type = 'warning';
				break;
			case 'ENDED':
				type = 'danger';
				break;
			case 'UNAVAILABLE':
				type = 'unavailable';
				break;
		}

		return <EventBadge style={styles.badgeCode} text={this.props.event.inviteCode} position="normal" type={type} />;
	}

    render() {
        console.log("event props", this.props.event)
        return (
            <View key={this.props.event.id} style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: this.props.event.image ? this.props.event.image : noEventImage }} />
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
export default EventItem;
