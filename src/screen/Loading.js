import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Network from '../engine/Network'
import Dispatcher from '../router/Dispatcher'

export default class Loading extends Component {

    constructor(props) {
        super(props)
        console.log("test")
        Network.init()
        Dispatcher.add("status",this.status)
        Dispatcher.add("register",this.register)
        Dispatcher.add("login",this.login)
        Dispatcher.add("add/event",this.addEvent)
        Network.send("register/user",JSON.stringify({data:{mail:"clement.merlet123@gmail.com",password:"kisdskds",firstName:"test",lastName:"test2"}}))
        //Network.send("add/event",JSON.stringify({auth:"5ccc3b03eb3b5325a100c25b",data:{ title: "Manga mania", date: "02/06/2019", description: "Coucou je suis une description", admin: "5ccc3b03eb3b5325a100c25b", inviteCode: "MANGAMANIA2019",status: 0}}))
        //Network.send("add/event",JSON.stringify({auth:"5ccc3b03eb3b5325a100c25b",data:{ title: "BRANLETTE PARTY", date: "02/06/2019", description: "Coucou je suis une description", admin: "5ccc3b03eb3b5325a100c25b", inviteCode: "BRANLETTE",status: 0}}))
        Network.send("join/event",JSON.stringify({auth:"5ccc489e14c47e27de350914",data:{idEvent:"5ccc570f2bc3992a206fa87e"}}))
        
    }



    addEvent(data) {
        console.log(data)
    }

    status(data) {
        //Network.send("login/user",JSON.stringify({data:{mail:"clement.merlet@gmail.com",password:"kikoo"}}))
        console.log("Hi i'm status " + data)
    }

    register(data) {
        console.log(JSON.parse(data))
        
       
    }

    login(data) {
        console.log("Hi i'm login " + data)
    }

    render() {
        return (
            <View>
                <Text> Loading </Text>
            </View>
        )
    }
}
