import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Divider, Avatar, Icon, Image } from 'react-native-elements';
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
			isAdmin: false
		};
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

	showListGuests(){

	}

	render() {
		return (
			<View style={styles.page}>

				<View style={styles.screenContainer}>
					<Image
					style={{width: 450, height: 200}}
					source={{uri: 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg'}}
					/>
					<LinearGradient
						colors={['transparent', "rgba(255,255,255,0.2)","rgba(255,255,255,0.4)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.8)", "white"]}
						style={{ top:-50, alignItems: 'center', height:50, marginBottom: -50 }}></LinearGradient>
					

					<View style={styles.textContainer}>
						<Text style={styles.title}>Mon super événement</Text>
						<Text style={styles.lieuText}>Lyon 6</Text>

						<View style={styles.guestList}>
							<Avatar rounded title="MD"/>
							<Avatar rounded title="BS" />
							<Avatar rounded title="AZ" />
							<Avatar rounded title="5+" />
							<Icon style={styles.arrowIcon} name='ios-arrow-forward' type='ionicon' color={Colors.primary} onPress={() => this.showListGuests()}/> 
						</View>
							
						<Divider style={{ backgroundColor: 'black' }}/>
						<Text style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue neque in ligula accumsan, id malesuada risus fringilla. Curabitur id nisl massa. Curabitur facilisis nunc mattis venenatis condimentum. Curabitur ultricies sagittis scelerisque. Nulla placerat augue non lectus vestibulum.</Text>

						<Text style={styles.picsTitle}>Photos</Text>
					
							<View style={styles.picsList}>
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
							</View>

							<View style={styles.arrowIconPic}>
								<Icon size={30} name='ios-arrow-forward' type='ionicon' color={Colors.primary} onPress={() => this.showListGuests()}/> 
							</View>			

					</View>

				</View>

				<View style={styles.bottomSigninButton}>
					<RkButton rkType="pixEventBottom" style={styles.signinButton}>MODIFIER</RkButton>
				</View>
				
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);
