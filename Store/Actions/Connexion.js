export function login(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'login/user',
		payload: payload
	};
}

export function register(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'register/user',
		payload: payload
	};
}
