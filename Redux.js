import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

store.dispatch(getAllProducts());
