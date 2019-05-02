import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
if (__DEV__) {
	import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import PageTest from './src/Pages/PageTest';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={Store}>
				<PageTest />
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
