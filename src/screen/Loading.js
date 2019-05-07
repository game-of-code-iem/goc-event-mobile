import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { connectWS, sendMessage } from '../../Store/Actions/Websockets';
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
		this.state = { status: '400' };
	}
	componentDidMount() {
		this.props.connectWebSocket('http://192.168.43.233:4545');
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.props.response);

		if (this.props.response.code == '200') {
			this.props.navigation.replace('Login');
			this.props.clearResponse();
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
