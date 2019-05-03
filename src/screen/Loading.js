import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Network from '../engine/Network'
import Dispatcher from '../router/Dispatcher'

export default class Loading extends Component {

    constructor(props) {
        super(props)
        Network.init()
        Dispatcher.add("status",this.response)
    }


    response(data) {
        console.log("Hi i'm dispatch " + data)
    }

    render() {
        return (
            <View>
                <Text> Loading </Text>
            </View>
        )
    }
}
