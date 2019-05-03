// Network Engine //
import io from 'socket.io-client';
import Dispatcher from '../router/Dispatcher'
//import {connect} from 'react-redux'

let socket

function init() {
    //Create Socket
    console.log("test")
    socket = io.connect("http://192.168.43.211:4444",{
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax : 5000,
        reconnectionAttempts: Infinity
    })

    console.log()


    socket.on("connect", message => {
        console.log("Connected " + message)
    })

    socket.on("status", message => {
        Dispatcher.dispatch("status",message)
    })

    socket.on("register", message => {
        //props.setRegister(message)
    })

    socket.on("login", message => {
        //props.setLogin(message)
    })

    socket.on("account", message => {
        //props.setAccount(message)
    })

    socket.on("event", message => {
        //props.setEvent(message)
    })

    socket.on("action", message => {
        //props.setAction(message)
    })

    socket.on("disconnect", message => {
       //props.setDisconnect(message)
    })
    
}

function login(data) {
    socket.emit("login",data)
}

function register(data) {
    socket.emit("register",data)
}

function detail(data) {
    socket.emit("detail",data)
}

function action(data) {
    socket.emit("action",data)
}

export default {init,login,register,detail,action}
