import React, { Component } from 'react';
import { View, TouchableOpacity, WebView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MediaLibrary, FileSystem } from 'expo'
import { connect } from 'react-redux';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';
import FloatingChoice from '../components/FloatingChoice/FloatingChoice';
import styles from './styles/PhotoGalleryEvent.style';
import { ImagePicker, Permissions } from 'expo';

const mapStateToProps = (state) => ({
	currentEvent: state.Events.currentEvent
});

const mapDispatchToProps = (dispatch) => ({});

const window = Dimensions.get('window')

var contextPhoto = '';

class Gallery extends Component {
	constructor(props) {
		super(props);
		contextPhoto = this;
		this.state = {
			test: 'lol',
			eventId: this.props.eventId,
			event: props.currentEvent,
			takenImage: ""
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			downloadAll: this.downloadAll
		});
		
		this.askCameraRollPermission()
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

	downloadAll() {

		
		this.state.event.picturesList.map((picture, index) => {
			this.createOne(picture, "EVENT_NAME" + "_" + index).then(asset => { //TODO RECUPERER LE NAME DE L'EVENT
				console.log("Uri of file uploaded", asset)
			})
		})

		//RAJOUTER TOAST POUR DIRE QUE BIEN TELECHARGE
	}

	async createOne(pic, name) {
		const nextUri = FileSystem.cacheDirectory + 'image' + name + "." + pic.ext //On créé le fichier image dans le cache d'Expo
		console.log(nextUri)
		let b64 = pic.uri.split(",")[1]// On récupère la partie bytedata du base64
		console.log(b64)
		await FileSystem.writeAsStringAsync(nextUri, b64, { //On écrit dans le cache d'expo, seul dossier de write possible
			encoding: FileSystem.EncodingTypes.Base64,
		}) //On récupère le fileUri
		const asset = await MediaLibrary.createAssetAsync(nextUri) //On recréé la photo dans le file Library du device
		console.log("created", asset)
		return asset
	}

	// NAV BAR
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Nom de l'événement",
			headerTintColor: Colors.primary,
			headerRight: (
				<View style={{height: window.height}}>
					<TouchableOpacity style={styles.topBarIcon} onPress={() => contextPhoto.downloadAll()}>
						<Icon name="download" size={28} />
					</TouchableOpacity>
				</View>
			)
		};
	};

	onFloatingButtonChoice(id) {
		switch (id) {
			case 1:
				this.setState({ isFromGallery: true });
				this.pickImage(false)
				break;
			case 2:
				this.setState({ isFromCamera: true });
				this.pickImage(true)
				break;
		}
	}

	async pickImage(isCamera) {
		if (isCamera) {
			if (!this.state.gotCameraRollPerm) this.askCameraRollPermission()
			let options = {
				allowsEditing: true,
				base64: true
			}
			let result = await ImagePicker.launchCameraAsync(options)
			if (!result.cancelled) {
				console.log("J'ai eu une image de la cam !", result.base64)
				this.setState({ takenImageUri: result.base64 }); 
			}
		} else {
			let options = {
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				base64: true
			}
			let result = await ImagePicker.launchImageLibraryAsync(options)
			if (!result.cancelled) {
				console.log("J'ai eu une image dela gallery !", result.base64)
				this.setState({ takenImageUri: result.base64 }); 
			}
		}
	}

	render() {
		return (
			<View style={styles.galleryContainer}>
				<PhotoGallery photos={this.state.event.picturesList} />
				<FloatingChoice
					style={styles.floatingButton}
					callbackChoice={(id) => this.onFloatingButtonChoice(id)}
					choice1="Galerie"
					choice2="Caméra"
				/>
			</View>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);