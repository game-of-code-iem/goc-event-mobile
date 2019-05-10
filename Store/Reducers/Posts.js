/**
 * An example reducer to handle WebSocket messages.
 * NB: There is no error handling!
 */
import Reactotron from 'reactotron-react-native';

const initialState = {
	posts: []
};

function postReducer(state = initialState, action) {
	let data;

	switch (action.type) {
		case 'WEBSOCKET:R:POST_LIKE':
			// Assuming that your data is a DOMString in JSON format

			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:POST_LIKE'
				}
			});

		case 'WEBSOCKET:R:POST_UNLIKE':
			// Assuming that your data is a DOMString in JSON format

			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:POST_UNLIKE'
				}
			});

		case 'WEBSOCKET:R:POST_COMMENT':
			// Assuming that your data is a DOMString in JSON format

			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:POST_COMMENT'
				}
			});

		case 'WEBSOCKET:R:POST_UNCOMMENT':
			// Assuming that your data is a DOMString in JSON format

			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:POST_UNCOMMENT'
				}
			});

		case 'WEBSOCKET:R:POST_ADD':
			// Assuming that your data is a DOMString in JSON format

			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:POST_ADD'
				}
			});

		case 'WEBSOCKET:R:EVENT_DELETE':
			// Assuming that your data is a DOMString in JSON format

			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:EVENT_DELETE'
				}
			});

		case 'WEBSOCKET:R:POST_GET':
			// Assuming that your data is a DOMString in JSON format

			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:POST_GET'
				}
			});

		case 'WEBSOCKET:R:POST_UPDATE':
			// Assuming that your data is a DOMString in JSON format

			try {
				data = JSON.parse(action.payload);
			} catch (error) {
				// ... this is fine
			}

			return Object.assign({}, state, {
				Response: {
					code: 200,
					type: 'WEBSOCKET:R:POST_UPDATE'
				}
			});
		default:
			return state;
	}
}

export default postReducer;
