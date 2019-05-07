import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarCodeScanner, Permissions } from 'expo';
import DialogInput from 'react-native-dialog-input';
//CustomComponents
import EventList from '../components/Event/EventList';
import FloatingChoice from '../components/FloatingChoice/FloatingChoice';
//Styles and consts
import styles from './styles/ListEvent.style';
import Colors from '../consts/Colors';
//Redux
import { connect } from 'react-redux';
import { getEvent, setCurrentEvent } from '../../Store/Actions/Event';
import _ from 'lodash';

const mapStateToProps = (state) => ({
	response: state.Response,
	user: state.User.currentUser,
	events: state.Events.events
});

const mapDispatchToProps = (dispatch) => ({
	getEvent: (body) => dispatch(getEvent(body)),
	setCurrentEvent: (body) => dispatch(setCurrentEvent(body))
});

class ListEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			isScanningCode: false,
			isDialogVisible: false
		};
	}

	onEventItemClick(id) {
		console.log('ListEvent:onEventItemClick', id);
		let tmp = this.props.events[id];
		this.props.setCurrentEvent(tmp);
		this.props.navigation.navigate('DetailEvent');
		//TODO La navigation vers le detail de l'event
	}

	onFloatingButtonChoice(id) {
		console.log('ListEvent:onFloatingButtonChoice', id);
		switch (id) {
			case 1:
				this.setState({ isScanningCode: true });
				break;
			case 2:
				this.toggleDialog();
				break;
			case 3:
				console.log('Créer un event...');
				//TODO Lien vers le screen de création d'event !
				break;
		}
	}

	onDialogInputData(data) {
		console.log("Code d'invitation reçu : ", data);
		_.find(this.props.events, { age: 1, active: true });
		//TODO traiter le code d'invitation
		this.toggleDialog();
	}

	toggleDialog() {
		this.setState({ isDialogVisible: !this.state.isDialogVisible });
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Mes événements',
			headerTintColor: Colors.primary,
			headerRight: (
				<View>
					<TouchableOpacity style={styles.topBarIcon} onPress={() => console.log('Disconnecting...')}>
						<Icon name="sign-out" size={28} />
					</TouchableOpacity>
				</View>
			)
		};
	};

	async componentDidMount() {
		this.props.getEvent({ auth: this.props.user.id });
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress());
		//TODO Recupérer la liste des events
	}

	handleBarCodeScanned = ({ type, data }) => {
		console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
		this.setState({ isScanningCode: false });
		//TODO Traiter les données du QR Code, laisser la caméra et afficher un toast d'erreur si la data du code QR ne respecte pas la stucture !
	};

	changeHeaderTitle(title) {
		const { setParams } = this.props.navigation;
		setParams({ title: title });
	}

	handleBackPress() {
		if (this.state.isScanningCode) {
			this.setState({ isScanningCode: false });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.events != this.props.events) {
			this.setState({
				events: this.props.events
			});
		}
	}

	render() {
		return (
			<View>
				<EventList callbackItemClick={(id) => this.onEventItemClick(id)} events={this.props.events} />
				<FloatingChoice
					style={styles.floatingButton}
					callbackChoice={(val) => this.onFloatingButtonChoice(val)}
					choice1="Par QRCode"
					choice2="Par code secret"
					choice3="Créer un event"
				/>
				{this.state.isScanningCode && (
					<BarCodeScanner onBarCodeScanned={this.handleBarCodeScanned} style={StyleSheet.absoluteFill} />
				)}
				<DialogInput
					isDialogVisible={this.state.isDialogVisible}
					title={"Code d'invitation"}
					message={"Veuillez entrer le code de l'événement qui vous a été communiqué"}
					hintInput={'Code...'}
					submitInput={(inputText) => {
						this.onDialogInputData(inputText);
					}}
					closeDialog={() => {
						this.toggleDialog();
					}}
					submitText="OK"
					cancelText="Annuler"
				/>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent);
