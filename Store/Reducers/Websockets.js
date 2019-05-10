/**
 * An example reducer to handle WebSocket messages.
 * NB: There is no error handling!
 */
import Reactotron from 'reactotron-react-native';

const initialState = {
	code: 0,
	type: undefined
};

function reducer(state = initialState, action) {
	Reactotron.log(action);
	switch (action.type) {
		case 'WEBSOCKET:MESSAGE':
			Reactotron.log('message', action.payload);
			// Assuming that your data is a DOMString in JSON format
			let data;
			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				code: 200,
				data: data
			});

		case 'WEBSOCKET:OPEN':
			return Object.assign({}, state, {
				code: 200,
				type: 'WEBSOCKET:OPEN'
			});
			break;

		case 'RESPONSE:CLEAR':
			return Object.assign({}, state, {
				code: 0,
				type: undefined
			});
			break;

		case 'RESPONSE':
			try {
				response = JSON.parse(action.payload.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				code: response.code,
				type: action.payload.type
			});

		default:
			return state;
	}
}

export default reducer;
