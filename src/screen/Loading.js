import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { connectWS, sendMessage } from '../../Store/Actions/Websockets';

const mapStateToProps = (state) => ({
	response: state.websocket.Response
});

const mapDispatchToProps = (dispatch) => ({
	connectWebSocket: (body) => dispatch(connectWS(body)),
	sendWsMessage: (body) => dispatch(sendMessage(body))
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

		if (this.props.response.code == '200') {
			this.props.navigation.replace('Login');
		}
	}

	render() {
		return (
			<View>
				<Text> Loading ...</Text>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
