import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FloatingChoice from '../components/FloatingChoice/FloatingChoice';

const heightForFloating = Dimensions.get('window').height - getStatusBarHeight()

export default class Loading extends Component {

    static navigationOptions = {
        header: null
    };

    onFloatingChoiceSelected(val) {
        console.log("In loading, user selected " + val + " with floating")
    }

    render() {
        return (
            <View style={{ height: heightForFloating, marginTop: getStatusBarHeight() }}>
                <Text> Loading </Text>

            </View>
        )
    }
}

//<FloatingChoice choice1="Choix #1" choice2="Choix #2" callbackChoice={val => this.onFloatingChoiceSelected(val)} />