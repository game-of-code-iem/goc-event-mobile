// Store/configureStore.js
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './Reducers';
import Reactotron from '../ReactotronConfig';
import websocket from './Middleware/Websockets';

const middlewares = [ websocket ];

export default createStore(reducer, compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()));
