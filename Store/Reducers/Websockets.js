/**
 * An example reducer to handle WebSocket messages.
 * NB: There is no error handling!
 */
import Reactotron from 'reactotron-react-native';

const initialState = {
	Response: {
		code: 0,
		data: undefined
	}
};

function reducer(state = initialState, action) {
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
				Response: {
					code: 200,
					data: data
				}
			});

		case 'WEBSOCKET:OPEN':
			return Object.assign({}, state, {
				Response: {
					code: 200
				}
			});
			break;
		default:
			return state;
	}
}

export default reducer;
