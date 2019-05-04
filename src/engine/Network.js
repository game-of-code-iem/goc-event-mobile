// Network Engine //
import io from 'socket.io-client';
import Dispatcher from '../router/Dispatcher'
//import {connect} from 'react-redux'

let socket

function init() {
    //Create Socket
    console.log("test")
    socket = io.connect("http://192.168.43.47:4545",{
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax : 5000,
        reconnectionAttempts: Infinity
    })

    console.log()


    socket.on("connect", message => {
        console.log("Connected ")
    })

    socket.on("status", message => {
        Dispatcher.dispatch("status",message)
    })

    socket.on("register/user", message => {
        Dispatcher.dispatch("register",message)
        //props.setRegister(message)
    })

    socket.on("login/user", message => {
        console.log("login")
        Dispatcher.dispatch("login",message)
        //props.setLogin(message)
    })

    socket.on("account", message => {
        
        Dispatcher.dispatch("account",message)
        //props.setAccount(message)
    })

    socket.on("get/event", message => {
        console.log(message)
        //props.setEvent(message)
    })

    socket.on("action", message => {
        //props.setAction(message)
    })

    socket.on("disconnect", message => {
       //props.setDisconnect(message)
    })

    socket.on("join/event", message => {
        console.log(message)
     })


    socket.on("add/event", message => {
        Dispatcher.dispatch("add/event",message)
    })
    
}



function send(key,data) {
    console.log(data)
    socket.emit(key,data)
}


export default {init,send}
