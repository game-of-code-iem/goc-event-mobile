import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, Dimensions } from 'react-native';
import Qr from 'react-native-qrcode';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../consts/Colors";
const window = Dimensions.get('window')

class QRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = ({ navigation }) => {
		return {
			title: 'QR Code',
			headerTintColor: Colors.primary
		};
	};

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('code', 'NO-ID'); //REMETTRE A NO-ID
        return (
            <View style={{width:window.width, height: window.height, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                {itemId != "NO-ID" ? <Text style={{color: Colors.primary, marginBottom: 30, marginTop: 50, fontSize: 28, fontWeight: "bold", width:window.width, textAlign: "center"}}>{itemId}</Text> : null}
                {itemId != "NO-ID" ?
                    <Qr
                        style={{width: window.width}}
                        value={itemId}
                        size={200}
                        bgColor='black'
                        fgColor='white'/>
                : <Text style={{marginTop: 50, fontSize: 18, fontWeight: "bold"}}>Le Qr code n'a pas pu être récupéré</Text> }
            </View> 
        )
    }
}

export default QRCode