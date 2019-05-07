/**
 * An example middleware to handle WebSocket connections.
 * NB: There is no exception handling!
 */
import Reactotron from 'reactotron-react-native';
import io from 'socket.io-client';

let socket;

const middleware = (store) => (next) => (action) => {
	switch (action.type) {
		// User request to connect
		case 'WEBSOCKET:CONNECT':
			// Configure the object
			console.log('middleware', action.payload.url);
			Reactotron.log('ws', socket);
			Reactotron.log('store', store, next, action);
			if (socket == undefined) {
				socket = io.connect(action.payload.url, {
					reconnection: true,
					reconnectionDelay: 1000,
					reconnectionDelayMax: 5000,
					reconnectionAttempts: Infinity
				});

				socket.on('connect', () => {
					store.dispatch({ type: 'WEBSOCKET:OPEN' });
				});

				socket.on('disconect', (event) => {
					store.dispatch({ type: 'WEBSOCKET:DISCONNECT', payload: event });
				});

				socket.on('message', (event) => {
					store.dispatch({ type: 'WEBSOCKET:MESSAGE', payload: event });
				});

				////////////////////////////////////////////////////////////////////////

				socket.on('register/user', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:REGISTER', payload: event });
					store.dispatch({ type: 'RESPONSE', payload: { type: 'WEBSOCKET:R:REGISTER', payload: event } });
				});

				socket.on('login/user', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:LOGIN', payload: event });
					store.dispatch({ type: 'RESPONSE', payload: { type: 'WEBSOCKET:R:LOGIN', payload: event } });
				});

				//////////////////////////////////////////////////////////////////////////

				socket.on('delete/event', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:EVENT_DELETE', payload: event });
				});

				socket.on('update/event', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:EVENT_UPDATE', payload: event });
				});

				socket.on('join/event', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:EVENT_JOIN', payload: event });
				});

				socket.on('add/event', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:EVENT_ADD', payload: event });
				});

				socket.on('get/event', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:EVENT_GET', payload: event });
					store.dispatch({ type: 'RESPONSE', payload: { type: 'WEBSOCKET:R:EVENT_GET', payload: event } });
				});

				/////////////////////////////////////////////////////////////////////////////

				socket.on('like/post', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:POST_LIKE', payload: event });
				});

				socket.on('comment/post', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:POST_COMMENT', payload: event });
				});

				socket.on('add/post', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:POST_ADD', payload: event });
				});

				socket.on('delete/post', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:POST_DELETE', payload: event });
				});

				socket.on('unlike/post', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:POST_UNLIKE', payload: event });
				});

				socket.on('uncomment/post', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:POST_UNCOMMENT', payload: event });
				});

				socket.on('get/post', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:POST_GET', payload: event });
				});

				socket.on('update/post', (event) => {
					store.dispatch({ type: 'WEBSOCKET:R:POST_UPDATE', payload: event });
				});

				//////////////////////////////////////////////////////////////////////////////

				// socket.on('action', (event) => {
				// 	switch (key) {
				// 		case value:

				// 			break;

				// 		default:
				// 			break;
				// 	}

				// });
			}

			break;

		// User request to send a message
		case 'WEBSOCKET:SEND':
			Reactotron.log('SEND', action);
			socket.emit(action.route, JSON.stringify(action.payload));
			break;

		// User request to disconnect
		case 'WEBSOCKET:DISCONNECT':
			console.log('disconnect');

			break;

		case 'WEBSOCKET:CLEAR_RESPONSE':
			store.dispatch({ type: 'RESPONSE:CLEAR' });
			break;

		default:
			// We don't really need the default but ...
			break;
	}

	return next(action);
};

export default middleware;
