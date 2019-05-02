import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
//Custom Components
import EventList from "./components/Event/EventList"
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
			<View style={styles.container}>
				<EventList />
			</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 12,
		paddingRight: 12,
		marginTop: getStatusBarHeight()
	}
});
