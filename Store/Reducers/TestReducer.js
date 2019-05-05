import { combineReducers } from 'redux';
import { ACTOINS_TYPES } from '../Actions/Test';

const initialState = {
	visibilityFilter: 'VisibilityFilters.SHOW_ALL',
	todos: [],
	response: undefined
};
function visibilityFilter(state = initialState, action) {
	switch (action.type) {
		case ACTOINS_TYPES.SET_VISIBILITY_FILTER:
			return Object.assign({}, state, {
				visibilityFilter: action.filter
			});

		case ACTOINS_TYPES.INIT_WEBSOCKET:
			return Object.assign({}, state, {
				response: action.payload
			});
		default:
			return state;
	}
}

export default visibilityFilter;
