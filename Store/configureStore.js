// Store/configureStore.js
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './Reducers';
import Reactotron from '../ReactotronConfig';
import websocket from './Middleware/Websockets';

const middlewares = [ websocket ];
console.log('reduxConfigured');

export default createStore(reducer, compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()));
