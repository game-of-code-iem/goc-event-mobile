/**
 * An example reducer to handle WebSocket messages.
 * NB: There is no error handling!
 */
import Reactotron from 'reactotron-react-native';

const initialState = {
	events: []
};

function eventsReducer(state = initialState, action) {
	let response;
	switch (action.type) {
		case 'WEBSOCKET:R:EVENT_DELETE':
			// Assuming that your response is a DOMString in JSON format

			try {
				response = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:EVENT_DELETE'
				}
			});

		case 'WEBSOCKET:R:EVENT_UPDATE':
			// Assuming that your response is a DOMString in JSON format

			try {
				response = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:EVENT_UPDATE'
				}
			});

		case 'WEBSOCKET:R:EVENT_JOIN':
			// Assuming that your response is a DOMString in JSON format

			try {
				response = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:EVENT_JOIN'
				}
			});

		case 'WEBSOCKET:R:EVENT_GET':
			// Assuming that your response is a DOMString in JSON format

			try {
				response = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				events: response.data
			});

		case 'WEBSOCKET:R:EVENT_ADD':
			// Assuming that your response is a DOMString in JSON format

			try {
				response = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:EVENT_ADD'
				}
			});

		default:
			return state;
	}
}

export default eventsReducer;
