import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import { Divider, Avatar, Icon, Image, Overlay, Button } from 'react-native-elements';
import { RkButton } from 'react-native-ui-kitten';
import Colors from '../consts/Colors';
import { LinearGradient } from 'expo';

//Styles
import styles from './styles/DetailEvent.style';

const mapStateToProps = (state) => ({
	active: state.visibilityFilter
});

const mapDispatchToProps = (dispatch) => ({
	setVisibilityFilter: (body) => dispatch(setVisibilityFilter(body))
});

class DetailEvent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isAdmin: true,
			eventId: "",
			title: "Mon super événement",
			place: "Lyon 6",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue neque in ligula accumsan, id malesuada risus fringilla. Curabitur id nisl massa. Curabitur facilisis nunc mattis venenatis condimentum. Curabitur ultricies sagittis scelerisque. Nulla placerat augue non lectus vestibulum.",
			urlCoverImage: "http://www.mdjunited.com/medias/images/zoo.jpg",
			guests: [
				{prenom: "Morgane", nom:"Boussert"},
				{prenom: "Jean-machin", nom:"truc"}
			],
			picturesList: [],
			isGuestsListVisible: false
		};
	}

	componentDidMount(){
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

	showListPics(){
		 this.props.navigation.navigate('Gallery', {
		 	eventId: this.state.eventId
		   });
	}

	showListGuests(){
		var isVisible = this.state.isGuestsListVisible
		this.setState({
			isGuestsListVisible: !isVisible
		})
	}

	deleteGuest(index){
		console.log("delete guest :"+index)
		var guestToDelete = this.state.guests[index]

		Alert.alert(
			'Voulez-vous supprimer ce participant ?',
			guestToDelete.prenom+" "+guestToDelete.nom,
			[			  
			  { text: 'Annuler',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			  },
			  { text: 'OK', onPress: () => {
				var guestList = this.state.guests
				guestList.splice(index, 1)
				this.setState({
				  guests: guestList
			 	})
			  }} 			  
			],
			{cancelable: false},
		  );
	}


	render() {
		return (
			<View style={styles.page}>

				<View style={styles.screenContainer}>

					<Overlay 
						isVisible={this.state.isGuestsListVisible}
						onBackdropPress={() => this.setState({ isGuestsListVisible: false})}>
						<Text style={styles.picsTitle}>Liste des participants</Text>
						{this.state.guests.map((guest, index) => (
							<View style={styles.guestRow}>
								<Text style={styles.guestRowName}>{guest.prenom} {guest.nom}</Text>

								{this.state.isAdmin && 
								<TouchableOpacity onPress={() => this.deleteGuest(index)} > 
									<Icon size={31} name='ios-close' type='ionicon' color={Colors.primary}/>							
								</TouchableOpacity>		
								}

							</View>							
						))}
					</Overlay>

					<Image
					style={{width: 450, height: 200}}
					source={{uri: this.state.urlCoverImage}}
					/>
					<LinearGradient
						colors={['transparent', "rgba(255,255,255,0.2)","rgba(255,255,255,0.4)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.8)", "white"]}
						style={{ top:-50, alignItems: 'center', height:50, marginBottom: -50 }}></LinearGradient>
					

					<View style={styles.textContainer}>
						<Text style={styles.title}>{this.state.title}</Text>
						<Text style={styles.lieuText}>{this.state.place}</Text>

						<TouchableOpacity activeOpacity={1} style={styles.guestList} onPress={() => this.showListGuests()}>
							{this.state.guests.map((guest, index) => {								
								if(index <= 3) {
									return <Avatar rounded title={guest.prenom.charAt(0).toUpperCase()+ guest.nom.charAt(0).toUpperCase()} /> }																
							})}
							<Avatar rounded title={this.state.guests.length + " +"} />							
							<Icon style={styles.arrowIcon} name='ios-arrow-forward' type='ionicon' color={Colors.primary}/> 
						</TouchableOpacity>
							
						<Divider style={{ backgroundColor: 'black' }}/>
						<Text style={styles.descriptionText}>{this.state.description}</Text>

						<Text style={styles.picsTitle}>Photos</Text>
					
							<TouchableOpacity activeOpacity={1} style={styles.picsList} onPress={() => this.showListPics()}>
							
								<Image
									source={{ uri: 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg' }}
									style={{ width: 100, height: 100 }}
									PlaceholderContent={<ActivityIndicator />}
								/>
								<Image
									source={{ uri: 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg' }}
									style={{ width: 100, height: 100 }}
									PlaceholderContent={<ActivityIndicator />}
								/>
								<Image
									source={{ uri: 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg' }}
									style={{ width: 100, height: 100 }}
									PlaceholderContent={<ActivityIndicator />}
								/>

								<View style={styles.arrowIconPic}>
									<Icon size={30} name='ios-arrow-forward' type='ionicon' color={Colors.primary}/> 
								</View>		

								</TouchableOpacity>

							

					</View>

				</View>

				{this.state.isAdmin && 
				<View style={styles.bottomSigninButton}>
					<RkButton rkType="pixEventBottom" style={styles.signinButton}>MODIFIER</RkButton>
				</View>
				}

			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);
