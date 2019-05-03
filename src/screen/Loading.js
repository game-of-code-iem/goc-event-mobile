import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { connectWS, sendMessage } from '../../Store/Actions/Websockets';
import { login, register } from '../../Store/Actions/Connexion';

const mapStateToProps = (state) => ({
	response: state.response
});

const mapDispatchToProps = (dispatch) => ({
	connectWebSocket: (body) => dispatch(connectWS(body)),
	sendWsMessage: (body) => dispatch(sendMessage(body)),
	userLogin: (body) => dispatch(login(body)),
	userRegister: (body) => dispatch(register(body))
});

class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = { status: '400' };
	}
	componentDidMount() {
		this.props.connectWebSocket('http://192.168.43.47:4545');
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.props.response);

		if (this.props.response.status == '200') {
			this.props.navigation.navigate('Login');
		}
	}

	render() {
		return (
			<View>
				<Text> Loading ...</Text>
				<Button
					onPress={() => {
						this.props.userLogin({
							data: {
								mail: 'clement.merlet@gmail.com',
								password: 'kikoo'
							}
						});
					}}
					title="Press Me"
				/>

				<Button
					onPress={() => {
						this.props.userRegister({
							data: {
								mail: 'toto@gmail.com',
								password: 'thomas',
								lastName: 'clement',
								firstName: 'merlet'
							}
						});
					}}
					title="Register"
				/>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
