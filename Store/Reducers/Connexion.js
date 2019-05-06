/**
 * An example reducer to handle WebSocket messages.
 * NB: There is no error handling!
 */
import Reactotron from 'reactotron-react-native';

const initialState = {
	currentUser: {
		id: undefined,
		firstname: undefined,
		lastname: undefined,
		email: undefined
	}
};

function connexionReducer(state = initialState, action) {
	let result;
	switch (action.type) {
		case 'WEBSOCKET:R:LOGIN':
			// Assuming that your data is a DOMString in JSON format

			try {
				result = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				currentUser: {
					id: result.data.user.userId
				}
			});

		case 'WEBSOCKET:R:REGISTER':
			// Assuming that your data is a DOMString in JSON format
			Reactotron.log('regiter', action);
			try {
				result = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				currentUser: {
					id: result.id
				},

				Response: {
					code: result.code,
					type: 'WEBSOCKET:R:REGISTER'
				}
			});
		default:
			return state;
	}
}

export default connexionReducer;
