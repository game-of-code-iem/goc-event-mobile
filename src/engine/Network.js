// Network Engine //
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

const url = 'http://17ruecroixberthet.freeboxos.fr:4444';
let socket;

const mapDispatchToProps = (dispatch) => ({
	setStatus: (response) => dispatch(setStatus(response)),
	setRegister: (response) => dispatch(setRegister(response)),
	setLogin: (response) => dispatch(setLogin(response)),
	setAccount: (response) => dispatch(setAccount(response)),
	setEvent: (response) => dispatch(setEvent(response)),
	setAction: (response) => dispatch(setAction(response))
});

function init(props) {
	//Create Socket
	socket = SocketIOClient(url);

	socket.on('status', (message) => {
		props.setStatus(message);
	});

	socket.on('register', (message) => {
		props.setRegister(message);
	});

	socket.on('login', (message) => {
		props.setLogin(message);
	});

	socket.on('account', (message) => {
		props.setAccount(message);
	});

	socket.on('event', (message) => {
		props.setEvent(message);
	});

	socket.on('action', (message) => {
		props.setAction(message);
	});

	socket.on('disconnect', (message) => {
		props.setDisconnect(message);
	});
}

function login(data) {
	socket.emit('login', data);
}

function register(data) {
	socket.emit('register', data);
}

function detail(data) {
	socket.emit('detail', data);
}

function action(data) {
	socket.emit('action', data);
}

export default connect(mapDispatchToProps)(init);
