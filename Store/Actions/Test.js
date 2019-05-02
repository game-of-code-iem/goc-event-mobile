export const ACTOINS_TYPES = {
	ADD_TODO: 'ADD_TODO',
	TOGGLE_TODO: 'TOGGLE_TODO',
	SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
	INIT_WEBSOCKET: 'INIT_WEBSOCKET'
};

/*
 * action creators
 */

export function addTodo(text) {
	return { type: ADD_TODO, text };
}

export function toggleTodo(index) {
	return { type: TOGGLE_TODO, index };
}

export function setVisibilityFilter(filter) {
	return { type: SET_VISIBILITY_FILTER, filter };
}

export function setStatus(payload) {
	return { type: INIT_WEBSOCKET, payload };
}
