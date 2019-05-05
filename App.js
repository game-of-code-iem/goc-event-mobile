import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Router from './src/router/Router';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
if (__DEV__) {
	import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const AppContainer = createAppContainer(Router);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={Store}>
				<AppContainer />
			</Provider>
		);
	}
}
