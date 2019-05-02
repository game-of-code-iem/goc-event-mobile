// Store/configureStore.js

import { createStore, compose } from 'redux';
import todoApp from './Reducers/TestReducer';
import Reactotron from '../ReactotronConfig';

export default createStore(todoApp, compose(Reactotron.createEnhancer()));
