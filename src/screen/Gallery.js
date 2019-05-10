import React, { Component } from 'react';
import { View, TouchableOpacity, WebView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MediaLibrary, FileSystem } from 'expo'
import { connect } from 'react-redux';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';
import styles from './styles/PhotoGalleryEvent.style';

const mapStateToProps = (state) => ({
	currentEvent: state.Events.currentEvent
});

const mapDispatchToProps = (dispatch) => ({});

var contextPhoto = '';

class Gallery extends Component {
	constructor(props) {
		super(props);
		contextPhoto = this;
		this.state = {
			test: 'lol',
			eventId: this.props.eventId,
			event: props.currentEvent
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			downloadAll: this.downloadAll
		});
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
				<View>
					<TouchableOpacity style={styles.topBarIcon} onPress={() => contextPhoto.downloadAll()}>
						<Icon name="download" size={28} />
					</TouchableOpacity>
				</View>
			)
		};
	};

	render() {
		return (
			<View>
				<PhotoGallery photos={this.state.event.picturesList} />
			</View>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);