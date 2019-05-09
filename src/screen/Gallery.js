import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';
import styles from './styles/PhotoGalleryEvent.style';

const mapStateToProps = (state) => ({
	response: state.connexion.Response
});

const mapDispatchToProps = (dispatch) => ({
});

var contextPhoto="";

class Gallery extends Component {
	constructor(props) {
		super(props);
		contextPhoto = this;
		this.state = {
			test: "lol",
			eventId: this.props.eventId,
			event: {
				picturesList: [
					{
						uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=',
						ext: "png"
					},
					{
						uri:'https://admin.revelryeventdesigners.com//media/5a39909ca2fb7.jpg',
						ext: "png"
					},
					{
						uri:'https://d2j8c2rj2f9b78.cloudfront.net/uploads/hero-images/The-Avett-Brothers-Concert-Bojangles.jpg',
						ext: "png"
					},
					{
						uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=',
						ext: "png"
					},
					{
						uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=',
						ext: "png"
					},
					{
						uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=',
						ext: "png"
					},
					{
						uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=',
						ext: "png"
					}
				]
			}
		};

	}

	redirectToComments(imageId) {
		console.log("redirectToComments, id : "+imageId)
		this.props.navigation.navigate('Comments', {
			pictureId: imageId
		});
	}

	componentDidMount(){
		this.props.navigation.setParams({
			downloadAll: this.downloadAll
		})
	}

	downloadAll(){		
		this.state.event.picturesList.map((picture, index) => {
     // picture.uri,	FileSystem.documentDirectory + 'nom_evenement_' + index + picture.ext

			// RNFetchBlob
			// .config({
			// 	fileCache : true,
			// 	// Options uniquement pour Android
			// 	addAndroidDownloads : {					
			// 		notification : true,
			// 		title : 'Great ! Download Success ! :O ',
			// 		description : 'An image file.',
			// 		mime : 'image/png',
			// 		mediaScannable : true,
			// 	}
			// })
			// .fetch('GET', 'https://admin.revelryeventdesigners.com//media/5a39909ca2fb7.jpg', {
			// })
			// .progress((received, total) => {
      //   console.log('progress', received / total)
      // })
			// .then((res) => {
			// 	console.log('The file saved to ', res.path())
			// })

		})
	}

	// NAV BAR
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Nom de l\'événement',
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
				<PhotoGallery callbackComments={imageId => this.redirectToComments(imageId)} photos={this.state.event.picturesList} />					
			</View>
		);    
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);