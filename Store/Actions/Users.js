export function getUsers(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'get/users',
		payload: payload
	};
}
