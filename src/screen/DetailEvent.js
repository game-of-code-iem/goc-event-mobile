import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { Divider, Avatar, Icon, Image } from 'react-native-elements';
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
			event: props.currentEvent
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
		// this.props.navigation.navigate('PicturesList', {
		// 	eventId: this.state.eventId
		//   });
	}

	showListGuests() {}

	render() {
		return (
			<View style={styles.page}>
				<View style={styles.screenContainer}>
					<Image style={{ width: 450, height: 200 }} source={{ uri: this.state.event.urlCoverImage }} />
					<LinearGradient
						colors={[
							'transparent',
							'rgba(255,255,255,0.2)',
							'rgba(255,255,255,0.4)',
							'rgba(255,255,255,0.6)',
							'rgba(255,255,255,0.8)',
							'white'
						]}
						style={{ top: -50, alignItems: 'center', height: 50, marginBottom: -50 }}
					/>

					<View style={styles.textContainer}>
						<Text style={styles.title}>{this.state.event.title}</Text>
						<Text style={styles.lieuText}>{this.state.event.place}</Text>

						<View style={styles.guestList}>
							<Avatar rounded title="MD" />
							<Avatar rounded title="BS" />
							<Avatar rounded title="AZ" />
							<Avatar rounded title="5+" />
							<Icon
								style={styles.arrowIcon}
								name="ios-arrow-forward"
								type="ionicon"
								color={Colors.primary}
								onPress={() => this.showListGuests()}
							/>
						</View>

						<Divider style={{ backgroundColor: 'black' }} />
						<Text style={styles.descriptionText}>{this.state.event.description}</Text>

						<Text style={styles.picsTitle}>Photos</Text>

						<View style={styles.picsList}>
							<Image
								source={{
									uri:
										'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg'
								}}
								style={{ width: 100, height: 100 }}
								PlaceholderContent={<ActivityIndicator />}
							/>
							<Image
								source={{
									uri:
										'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg'
								}}
								style={{ width: 100, height: 100 }}
								PlaceholderContent={<ActivityIndicator />}
							/>
							<Image
								source={{
									uri:
										'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg'
								}}
								style={{ width: 100, height: 100 }}
								PlaceholderContent={<ActivityIndicator />}
							/>

							<View style={styles.arrowIconPic}>
								<Icon
									size={30}
									name="ios-arrow-forward"
									type="ionicon"
									color={Colors.primary}
									onPress={() => this.showListPics()}
								/>
							</View>
						</View>
					</View>
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
