export function setCurrentEvent(payload) {
	return {
		type: 'EVENT:SET_CURRENT',
		payload: payload
	};
}

export function deleteEvent(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'delete/event',
		payload: payload
	};
}

export function updateEvent(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'update/event',
		payload: payload
	};
}

export function joinEvent(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'join/event',
		payload: payload
	};
}

export function addEvent(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'add/event',
		payload: payload
	};
}

export function getEvent(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'get/event',
		payload: payload
	};
}
