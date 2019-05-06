import { combineReducers } from 'redux';
import Response from './Websockets';
import User from './Connexion';
import Events from './Events';
import Posts from './Posts';

export default combineReducers({
	Response,
	User,
	Events,
	Posts
});
