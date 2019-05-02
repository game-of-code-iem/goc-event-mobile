import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
//Custom Components
import EventList from "./components/Event/EventList"

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<EventList />
			</View>
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
