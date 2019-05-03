/**
 * An example action creator to request a WebSocket connection.
 */
export function connectWS(url) {
	console.log('connect : ', url);

	return {
		type: 'WEBSOCKET:CONNECT',
		payload: {
			url
		}
	};
}

export function sendMessage(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'status',
		payload: payload
	};
}
