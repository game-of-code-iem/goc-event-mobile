import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from "./src/router/Router";
import { createAppContainer } from "react-navigation";

const AppContainer = createAppContainer(Router);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}
