export function likePost(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'like/post',
		payload: payload
	};
}
export function commentPost(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'comment/post',
		payload: payload
	};
}

export function addPost(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'add/post',
		payload: payload
	};
}

export function deletePost(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'delete/post',
		payload: payload
	};
}

export function unlikePost(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'unlike/post',
		payload: payload
	};
}

export function unCommentPost(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'uncomment/post',
		payload: payload
	};
}

export function getPost(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'get/post',
		payload: payload
	};
}

export function updatePost(payload) {
	return {
		type: 'WEBSOCKET:SEND',
		route: 'update/post',
		payload: payload
	};
}
