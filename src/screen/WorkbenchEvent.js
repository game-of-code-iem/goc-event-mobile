import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { RkTextInput, RkButton, RkText, RkCalendar } from 'react-native-ui-kitten';
import { SearchBar, Divider } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import InviteSystem from '../engine/InviteSystem';
import { ImagePicker, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
//Styles & consts
import styles from './styles/WorkbenchEvent.style';
import Colors from '../consts/Colors';
const moment = require('moment');
import { addEvent, updateEvent } from '../../Store/Actions/Event';
import { clearResponse } from '../../Store/Actions/Response';
import reactotron from 'reactotron-react-native';

const mapStateToProps = (state) => ({
	response: state.Response,
	currentUser: state.User.currentUser,
	currentEvent: state.Events.currentEvent
});

const mapDispatchToProps = (dispatch) => ({
	addEvent: (body) => dispatch(addEvent(body)),
	updateEvent: (body) => dispatch(updateEvent(body)),
	clearResponse: () => dispatch(clearResponse())
});

class WorkbenchEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			titleError: false,
			descError: false,
			uploadedImage: 'a',
			uploadedImageExt: '',
			search: '',
			showSearchResults: false,
			showFirstResult: false,
			searchUsers: [],
			cEventId: null,
			cEventTitle: '',
			cEventDate: '09/05/2019',
			cEventDescription: '',
			cEventGuests: [],
			cEventIsDraft: false,
			cEventImage: '',
			gotCameraRollPerm: false,
			isUpdate: false
		};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Editer un événement',
			headerTintColor: Colors.primary
		};
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState != this.state) {
			reactotron.log('satte', this.state);
		}
	}

	async componentDidMount() {
		// SOCKET
		// Get Event by Id => this.state (cEventId, cEventTitle, cEventGuests...)

		if (Platform.OS == 'ios') this.askCameraRollPermission();

		this.setState({ cEventDate: moment().format('L') });
		console.log(moment().format('L'));
	}

	componentWillMount() {
		if (this.props.currentEvent != undefined) {
			//If it's an update
			this.addUpdateData();
		}
	}

	async askCameraRollPermission() {
		const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
		if (permission.status !== 'granted') {
			const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (newPermission.status === 'granted') {
				console.log('CAMERA ROLL PERMISSION GRANTED');
				this.setState({ gotCameraRollPerm: true });
			}
		} else {
			console.log('CAMERA ROLL PERMISSION MISSING');
			this.setState({ gotCameraRollPerm: false });
		}
	}

	addUpdateData() {
		reactotron.log('addUpdate');
		this.setState({
			isUpdate: true,
			uploadedImage: this.props.currentEvent.uri,
			cEventId: this.props.currentEvent._id,
			cEventTitle: this.props.currentEvent.title,
			cEventDate: this.props.currentEvent.date,
			cEventDescription: this.props.currentEvent.description,
			cEventGuests: this.props.currentEvent.guests,
			cEventImage: this.props.currentEvent.uri,
			gotCameraRollPerm: false
		});
	}

	updateSearch(search) {
		this.setState({ search }); //eg si un user est trouvé dans la recherche !
		if (search == 'Ok') {
			//La recherche a des résultats : on affiche les résultats et on cache l'ajout d'un user désincris
			this.setState({
				searchUsers: [
					{
						id: 15,
						firstName: 'Nils',
						lastName: 'WILMET',
						mail: 'nils.wilmet@gmail.com'
					},
					{
						id: 5,
						firstName: 'Clément',
						lastName: 'MERLET',
						mail: 'clement.merlet@gmail.com'
					},
					{
						id: 8,
						firstName: 'Morgane',
						lastName: 'BOUSSERT',
						mail: 'morgane.boussert@gmail.com'
					},
					{
						id: 22,
						firstName: 'Romaric',
						lastName: 'ROUSSEL',
						mail: 'romaric.roussel@gmail.com'
					},
					{
						id: 44,
						firstName: 'Thomas',
						lastName: 'PETITJEAN',
						mail: 'thomas.petitjean@gmail.com'
					},
					{
						id: 78,
						firstName: 'Théo',
						lastName: 'TANCHOUX',
						mail: 'theo.tanchoux@gmail.com'
					}
				]
			});
			this.setState({ showSearchResults: true });
			this.setState({ showFirstResult: false });
		} else {
			//La recherche n'affiche pas de résultats
			this.setState({ searchUsers: [] });
		}
		if (this.state.searchUsers.length == 0 && search != '') {
			//Mais si la recherche n'affiche pas de résultats ET est != de "", on affiche la possiblité d'ajouter une personne désinscrite
			this.setState({ showFirstResult: true });
		}
		if (search == '') {
			//Sinon si search est à "" on ferme aussi la possibilité d'ajouter une personne désinscrite
			this.setState({ showFirstResult: false });
		}
	}

	renderIcon(icon) {
		return <Icon name={icon} size={11} />;
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.response.code == 200) {
			if (
				this.props.response.type == 'WEBSOCKET:R:EVENT_UPDATE' ||
				this.props.response.type == 'WEBSOCKET:R:EVENT_ADD'
			) {
				this.props.navigation.pop(1);
			}
		}
	}

	_pickImage = async () => {
		if (Platform.OS == 'ios') {
			console.log('on ios, asking Cam Roll Permission');
			this.askCameraRollPermission();
		}
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [ 4, 3 ]
		}).catch((e) => {
			this.askCameraRollPermission();
			console.log(e);
			//TODO Toast de la permission needed
		});

		console.log(result);

		if (!result.cancelled) {
			console.log('IMG RESULT', result);
			var splitted = result.uri.split('.');
			var ext = splitted[splitted.length - 1];
			console.log('Extension', ext);
			this.setState({ uploadedImageExt: ext });
			this.toBase64(result.uri)
				.then((b64) => {
					var fullURI = 'data:' + result.type + '/' + ext + ';base64,' + b64;
					this.setState({ uploadedImage: fullURI });
					this.setState({ cEventImage: b64 });
					this.imageInput.source = fullURI;
				})
				.catch((e) => {
					//TODO Toast erreur de conversion de l'image en base 64
				});
		} else {
			//TODO Toast du cancel/error
		}
	};

	async toBase64(fileUri) {
		const imageB64 = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingTypes.Base64 });
		return await imageB64;
	}

	selectUser(user) {
		console.log('User selected:' + user.id);
		if (
			this.state.cEventGuests.filter((item) => {
				return item.id === user.id;
			}).length > 0
		) {
			console.log('User already in array');
			// NE RIEN FAIRE
		} else {
			userArray = this.state.cEventGuests;
			userArray.push(user);
			this.setState({ cEventGuests: userArray });
		}
	}

	deleteUserFromList(userId) {
		let userArray = this.state.cEventGuests.filter((user) => {
			return user.id != userId;
		});
		this.setState({ cEventGuests: userArray });
	}

	buildPayload(isDraft) {
		var event = {};
		console.log(this.state.cEventDate);
		console.log(Date.parse(this.state.cEventDate));
		event.date = Date.parse(this.state.cEventDate);
		event.title = this.state.cEventTitle;
		event.description = this.state.cEventDescription;
		event.guests = this.state.cEventGuests;
		event.status = isDraft ? 'PREPARING' : 'OPEN';
		event.uri = this.state.uploadedImage;
		{
			!this.state.isUpdate && (event.inviteCode = InviteSystem.generateInviteCode());
		}

		event.extension = this.state.uploadedImageExt;
		{
			this.state.isUpdate && (event.idEvent = this.props.currentEvent._id);
		}

		if (this.state.isUpdate) {
			//API
			//METTRE A JOUR L'EVENT
			this.props.updateEvent({
				auth: this.props.currentUser.id,
				data: event
			});
		} else {
			reactotron.log('state', event);
			this.props.addEvent({
				auth: this.props.currentUser.id,
				data: event
			});
		}
	}

	render() {
		reactotron.log('state', this.state);
		return (
			<View style={styles.workbenchContainer}>
				<View style={styles.workbenchInfoHeader}>
					<TouchableOpacity onPress={() => this._pickImage()}>
						<View style={styles.infoHeaderImage}>
							<Image
								style={{ width: 100, height: 100 }}
								ref={(element) => {
									this.imageInput = element;
								}}
								source={{ uri: this.state.uploadedImage }}
							/>
						</View>
					</TouchableOpacity>
					<View style={styles.infoHeaderInputs}>
						<RkTextInput //INPUT TITLE
							labelStyle={this.state.titleError ? { color: 'red' } : null}
							style={this.state.titleError ? { borderBottomColor: 'red' } : null}
							label={this.renderIcon('tag')}
							placeholder="Titre"
							onChangeText={(val) => this.setState({ cEventTitle: val })}
							value={this.state.cEventTitle}
							selectionColor={Colors.primary}
							returnKeyType="next"
							onSubmitEditing={() => this.descInput.focusInput()}
							ref={(element) => {
								this.loginInput = element;
							}}
						/>
						<View style={styles.dateView}>
							<DatePicker
								style={{ width: 200 }}
								date={this.state.cEventDate}
								mode="date"
								placeholder="Choisir une date..."
								format="DD/MM/YYYY"
								minDate={moment().format('L')}
								confirmBtnText="Confirmer"
								cancelBtnText="Annuler"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36
									}
									// ... You can check the source to find the other keys.
								}}
								onDateChange={(date) => {
									console.log('Datee', date);
									this.setState({ cEventDate: date });
								}}
							/>
						</View>
					</View>
				</View>
				<View style={styles.descriptionView}>
					<RkTextInput //INPUT DESCRIPTION
						labelStyle={this.state.descError ? { color: 'red' } : null}
						style={[ styles.descriptionInput, this.state.descError ? { borderBottomColor: 'red' } : null ]}
						label={this.renderIcon('tags')}
						onChangeText={(val) => this.setState({ cEventDescription: val })}
						value={this.state.cEventDescription}
						placeholder="Description"
						multiline={true}
						selectionColor={Colors.primary}
						ref={(element) => {
							this.descInput = element;
						}}
					/>
				</View>

				<View style={styles.guestsComponent}>
					<Text style={styles.titleGuests}>Participants</Text>
					<SearchBar
						placeholder="Rechercher un utilisateur..."
						platform={Platform.OS}
						onChangeText={(search) => this.updateSearch(search)}
						lightTheme={true}
						value={this.state.search}
					/>
					{this.state.showSearchResults &&
					this.state.searchUsers && (
						<View style={styles.userResultBox}>
							<FlatList
								extraData={this.state}
								data={this.state.searchUsers}
								renderItem={({ item, index }) => (
									<View style={styles.userNames}>
										<TouchableOpacity onPress={() => this.selectUser(item)}>
											<Text>{item.firstName + ' ' + item.lastName}</Text>
										</TouchableOpacity>
									</View>
								)}
							/>
						</View>
					)}
					<Divider style={{ backgroundColor: Colors.indigo, margin: 12, marginBottom: 8 }} />
					<View style={styles.selectedGuestsBox}>
						{this.state.cEventGuests.length != 0 ? (
							<FlatList
								extraData={this.state}
								style={styles.flatlistSelected}
								data={this.state.cEventGuests}
								renderItem={({ item, index }) => (
									<View style={styles.selectedUserItem}>
										<View style={styles.selectedUserItemView}>
											<Text>{item.firstName + ' ' + item.lastName}</Text>
											<TouchableOpacity onPress={() => this.deleteUserFromList(item.id)}>
												<Icon color={Colors.red} name="times-circle-o" size={22} />
											</TouchableOpacity>
										</View>
									</View>
								)}
							/>
						) : (
							<View style={styles.nobodyBox}>
								<Text style={styles.nobodyFound}>
									Aucun participant, ajoutez les avec la recherche !
								</Text>
							</View>
						)}
					</View>
				</View>
				<View style={styles.buttonBottom}>
					<RkButton
						style={styles.submitForm}
						onPress={() => this.buildPayload(true)}
						rkType="pixEventBottomSecondary"
					>
						BROUILLON
					</RkButton>
					<RkButton style={styles.submitForm} onPress={() => this.buildPayload()} rkType="pixEventBottom">
						{!this.state.isUpdate ? 'TERMINER' : 'METTRE A JOUR'}
					</RkButton>
				</View>
			</View>
		);
	}
}
/*

*/

export default connect(mapStateToProps, mapDispatchToProps)(WorkbenchEvent);
