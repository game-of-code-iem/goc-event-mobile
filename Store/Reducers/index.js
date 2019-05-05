import { combineReducers } from 'redux';
import todos from './TestReducer';
import websocket from './Websockets';
import connexion from './Connexion';
import events from './Events';
import posts from './Posts';

export default combineReducers({
	todos,
	websocket,
	connexion,
	events,
	posts
});
