import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { connectWS, sendMessage } from '../../Store/Actions/Websockets';
import Colors from '../consts/Colors';
import styles from "./styles/Loading.style"
import { clearResponse } from '../../Store/Actions/Response';

const mapStateToProps = (state) => ({
	response: state.Response
});

const mapDispatchToProps = (dispatch) => ({
	connectWebSocket: (body) => dispatch(connectWS(body)),
	sendWsMessage: (body) => dispatch(sendMessage(body)),
	clearResponse: () => dispatch(clearResponse())
});

class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: '400',
			loadingTitle: "Chargement...",
			isLoading: true
		};
	}

	static navigationOptions = {
		header: null
	};

	componentDidMount() {
		this.props.connectWebSocket('http://192.168.43.89:4545');
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.response) {
			console.log(this.props.response);

			if (this.props.response.code == '200') {
				this.props.navigation.replace('Login');
			} else {
				this.setState({ loadingTitle: "Erreur de connexion", isLoading: false })
			}
		} else {
			this.setState({ loadingTitle: "Erreur de connexion", isLoading: false })
		}

	}

	render() {
		return (
			<View style={styles.screenContainer}>
				<Image style={styles.logo} source={require('../images/logo.png')} />
				{this.state.isLoading && <ActivityIndicator size={100} color={Colors.primary} />}
				<Text style={styles.loadingTitle}>{this.state.loadingTitle}</Text>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
