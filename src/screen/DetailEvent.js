import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Alert, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import IconFa from 'react-native-vector-icons/FontAwesome';
import { Divider, Avatar, Icon, Image, Overlay, Button } from 'react-native-elements';
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
			guests: [{ prenom: 'Morgane', nom: 'Boussert' }, { prenom: 'Jean-machin', nom: 'truc' }],
			isGuestsListVisible: false
		};
	}

	// NAV BAR
	static navigationOptions = ({ navigation }) => {
		//console.log("NAV GOT CODE ?", navigation.getParam('code'))
		const code = navigation.getParam('code')
		return {
			title: 'Détail événement',
			headerTintColor: Colors.primary,
			headerRight: (
				<View style={{ marginRight: 8 }}>
					<TouchableOpacity onPress={() => navigation.navigate("QRCode", {code: code})}>
						<IconFa name="qrcode" size={28} />
					</TouchableOpacity>
				</View>
			)
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

	deleteGuest(index) {
		console.log("delete guest :" + index)
		var guestToDelete = this.state.guests[index]

		Alert.alert(
			'Voulez-vous supprimer ce participant ?',
			guestToDelete.prenom + " " + guestToDelete.nom,
			[
				{
					text: 'Annuler',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'OK', onPress: () => {
						var guestList = this.state.guests
						guestList.splice(index, 1)
						this.setState({
							guests: guestList
						})
					}
				}
			],
			{ cancelable: false },
		);
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({ code: this.state.event.inviteCode })
        });
	}

	sendCodeToNavigation() {
		//nothing to do here...
	}

	render() {
		let withPictures = this.state.event.picturesList[0] != undefined || this.state.event.picturesList[1] != undefined || this.state.event.picturesList[2] != undefined
		console.log("Got pictures ?")
		console.log("1", this.state.event.picturesList[0])
		console.log("2", this.state.event.picturesList[1])
		console.log("3", this.state.event.picturesList[2])
		console.log("total:", withPictures)
		//this.sendCodeToNavigation()
		return (
			<View style={styles.page}>
				<View style={styles.screenContainer}>
					<Overlay
						isVisible={this.state.isGuestsListVisible}
						onBackdropPress={() => this.setState({ isGuestsListVisible: false })}
					>
						<Text style={styles.picsTitle}>Liste des participants</Text>
						{this.state.guests.map((guest, index) => (
							<View style={styles.guestRow}>
								<Text style={styles.guestRowName}>{guest.prenom} {guest.nom}</Text>
								<TouchableOpacity onPress={() => this.deleteGuest(index)} >
									<Icon size={31} name='ios-close' type='ionicon' color={Colors.primary} />
								</TouchableOpacity>
							</View>
						))}
					</Overlay>

					<Image style={{ width: 450, height: 200 }} source={{ uri: this.state.event.uri }} />
					<LinearGradient
						colors={['transparent', "rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.8)", "white"]}
						style={{ top: -50, alignItems: 'center', height: 50, marginBottom: -50 }}></LinearGradient>

					<View style={styles.textContainer}>
						<Text style={styles.title}>{this.state.event.title}</Text>
						<Text style={styles.lieuText}>{this.state.event.place}</Text>

						{this.state.event.guests.length != 0 ?
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

							</TouchableOpacity> :
							<Text>Il n'y a encore aucun participant</Text>}
					</View>

					{withPictures ?
						<TouchableOpacity activeOpacity={1} style={styles.picsList} onPress={() => this.showListPics()}>
							{this.state.event.picturesList[0] &&
								<Image
									source={{
										uri: this.state.event.picturesList[0] && this.state.event.picturesList[0].uri
									}}
									style={{ width: 100, height: 100 }}
									PlaceholderContent={<ActivityIndicator />}
								/>}
							{this.state.event.picturesList[1] &&
								<Image
									source={{
										uri: this.state.event.picturesList[1] && this.state.event.picturesList[1].uri
									}}
									style={{ width: 100, height: 100 }}
									PlaceholderContent={<ActivityIndicator />}
								/>}
							{this.state.event.picturesList[2] &&
								<Image
									source={{
										uri: this.state.event.picturesList[2] && this.state.event.picturesList[2].uri
									}}
									style={{ width: 100, height: 100 }}
									PlaceholderContent={<ActivityIndicator />}
								/>}

						</TouchableOpacity> :
						<Text style={styles.textNoData}>Aucune photo n'a été publiée</Text>}
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
