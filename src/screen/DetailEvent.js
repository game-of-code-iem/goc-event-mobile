import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Divider, Avatar, Icon, Image, Overlay } from 'react-native-elements';
import { RkButton } from 'react-native-ui-kitten';
import Colors from '../consts/Colors';
import { LinearGradient } from 'expo';

//Styles
import styles from './styles/DetailEvent.style';

const mapStateToProps = (state) => ({
	currentEvent: state.Events.currentEvent
});

const mapDispatchToProps = (dispatch) => ({});

class DetailEvent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			event: props.currentEvent,
			isAdmin: true,

			guests: [ { prenom: 'Morgane', nom: 'Boussert' }, { prenom: 'Jean-machin', nom: 'truc' } ],

			isGuestsListVisible: false
		};
	}

	componentDidMount() {
		// this.setState({
		// 	eventId:  this.props.navigation.getParams('eventId', 0)
		// })
	}

	// NAV BAR
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Détail événement',
			headerTintColor: Colors.primary
		};
	};

	handleBackPress() {
		if (this.state.isScanningCode) {
			this.setState({ isScanningCode: false });
		}
	}

	showListPics() {
		this.props.navigation.navigate('Gallery');
	}

	showListGuests() {
		var isVisible = this.state.isGuestsListVisible;
		this.setState({
			isGuestsListVisible: !isVisible
		});
	}

	render() {
		return (
			<View style={styles.page}>
				<View style={styles.screenContainer}>
					<Overlay
						isVisible={this.state.isGuestsListVisible}
						onBackdropPress={() => this.setState({ isGuestsListVisible: false })}
					>
						<Text style={styles.picsTitle}>Liste des participants</Text>
						{this.state.guests.map((guest, index) => (
							<Text>
								{guest.prenom} {guest.nom}
							</Text>
						))}
					</Overlay>

					<Image style={{ width: 450, height: 200 }} source={{ uri: this.state.event.uri }} />

					<View style={styles.textContainer}>
						<Text style={styles.title}>{this.state.event.title}</Text>
						<Text style={styles.lieuText}>{this.state.event.place}</Text>

						<TouchableOpacity
							activeOpacity={1}
							style={styles.guestList}
							onPress={() => this.showListGuests()}
						>
							{this.state.event.guests.map((guest, index) => {
								if (index < 3) {
									return (
										<Avatar
											rounded
											title={
												(guest.firstName == undefined
													? ''
													: guest.firstName.charAt(0).toUpperCase()) +
												(guest.lastName == undefined
													? ''
													: guest.lastName.charAt(0).toUpperCase())
											}
										/>
									);
								}
							})}
							{this.state.event.guests.length > 3 && (
								<Avatar rounded title={this.state.event.guests.length - 3 + ' +'} />
							)}

							<Icon
								style={styles.arrowIcon}
								name="ios-arrow-forward"
								type="ionicon"
								color={Colors.primary}
							/>
						</TouchableOpacity>
					</View>

					<TouchableOpacity activeOpacity={1} style={styles.picsList} onPress={() => this.showListPics()}>
						<Image
							source={{
								uri:
									this.state.event.picturesList[0] == undefined
										? 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg'
										: this.state.event.picturesList[0].uri
							}}
							style={{ width: 100, height: 100 }}
							PlaceholderContent={<ActivityIndicator />}
						/>
						<Image
							source={{
								uri:
									this.state.event.picturesList[1] == undefined
										? 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg'
										: this.state.event.picturesList[1].uri
							}}
							style={{ width: 100, height: 100 }}
							PlaceholderContent={<ActivityIndicator />}
						/>
						<Image
							source={{
								uri:
									this.state.event.picturesList[2] == undefined
										? 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg'
										: this.state.event.picturesList[2].uri
							}}
							style={{ width: 100, height: 100 }}
							PlaceholderContent={<ActivityIndicator />}
						/>
					</TouchableOpacity>
				</View>
				{this.state.event.isAdmin && (
					<View style={styles.bottomSigninButton}>
						<RkButton rkType="pixEventBottom" style={styles.signinButton}>
							MODIFIER
						</RkButton>
					</View>
				)}
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);
