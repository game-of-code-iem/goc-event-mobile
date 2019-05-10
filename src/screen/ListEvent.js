import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
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
import { getEvent } from '../../Store/Actions/Event';

const mapStateToProps = (state) => ({
	response: state.websocket.Response,
	user: state.connexion.User,
	events: state.events.Events.events
});

const mapDispatchToProps = (dispatch) => ({
	getEvent: (body) => dispatch(getEvent(body))
});

var context = null

class ListEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			isScanningCode: false,
			isDialogVisible: false
		};
		context = this
	}

	static navigationOptions = ({ navigation }) => {
		var headerLeft = null
		if (navigation.getParam("showBackQr") == true) {
			headerLeft = <View style={{ marginLeft: 8 }}>
				<TouchableOpacity onPress={() => context.handleBackPress()}>
					<IconMat name="arrow-back" color={Colors.primary} size={35} />
				</TouchableOpacity>
			</View>
		}
		return {
			title: navigation.getParam('title') || 'Mes événements',
			headerTintColor: Colors.primary,
			headerRight: ( //Attention au screen replace si on met un AsyncStorage des identifiants
				<View>
					<TouchableOpacity style={styles.topBarIcon} onPress={() => navigation.replace('Login')}>
						<Icon name="sign-out" size={28} />
					</TouchableOpacity>
				</View>
			),
			headerLeft: headerLeft
		};
	};
	onEventItemClick(id) {
		console.log('ListEvent:onEventItemClick', id);
		//TODO La navigation vers le detail de l'event
	}

	onFloatingButtonChoice(id) {
		console.log("ListEvent:onFloatingButtonChoice", id)
		switch (id) {
			case 1:
				this.setState({ isScanningCode: true })
				this.props.navigation.setParams({ showBackQr: true, title: "Scan du QR Code" })
				break;
			case 2:
				this.toggleDialog()
				break;
			case 3:
				console.log("Créer un event...")
				this.props.navigation.navigate('WorkbenchEvent')
				break;
		}
	}

	onDialogInputData(data) {
		console.log("Code d'invitation reçu : ", data);
		//TODO traiter le code d'invitation
		this.toggleDialog();
	}

	toggleDialog() {
		this.setState({ isDialogVisible: !this.state.isDialogVisible });
	}

	async componentDidMount() {
		this.props.getEvent({ auth: this.props.user.id });
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress());
		this.props.navigation.setParams({ title: "Mes événements" })
		//TODO Recupérer la liste des events
	}

	handleBarCodeScanned = ({ type, data }) => {
		console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
		this.setState({ isScanningCode: false });
		this.props.navigation.setParams({ showBackQr: false, title: "Mes événements" })
		//TODO Traiter les données du QR Code, laisser la caméra et afficher un toast d'erreur si la data du code QR ne respecte pas la stucture !
	};

	changeHeaderTitle(title) {
		const { setParams } = this.props.navigation;
		setParams({ title: title });
	}

	handleBackPress() {
		if (this.state.isScanningCode) {
			this.setState({ isScanningCode: false });
			this.props.navigation.setParams({ showBackQr: false, title: "Mes événements" })
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
			<View style={styles.listEventContainer}>
				<EventList callbackItemClick={(id) => this.onEventItemClick(id)} events={this.state.events} />
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
				<FloatingChoice
					style={styles.floatingButton}
					callbackChoice={(val) => this.onFloatingButtonChoice(val)}
					choice1="Par QRCode"
					choice2="Par code secret"
					choice3="Créer un event"
				/>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent);
