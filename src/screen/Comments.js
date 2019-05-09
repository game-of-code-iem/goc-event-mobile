import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Avatar, Input, Icon } from 'react-native-elements';
import { RkButton } from 'react-native-ui-kitten'
import Colors from '../consts/Colors';

//Styles
import styles from "./styles/Comments.style"

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "aaa",
            commentValue: "",
            commentList: [
                {
                    id: "ccc",
                    idUser: "bbb",
                    date: "1155554889",
                    text: "Coucou",
                    firstName: "Momo",
                    lastName: "Boussert"
                },
                {
                    id: "ddd",
                    idUser: "bbb",
                    date: "1155554889",
                    text: "Bonjour",
                    firstName: "Jean-mi",
                    lastName: "Test"
                }   
            ] }        
    }

    // NAV BAR
	 static navigationOptions = ({ navigation }) => {
	 	return {
	 		title: 'Commentaires',
	 		headerTintColor: Colors.primary
	 	};
     };
     
    likeComment(index){

    }

    render() {
        return (
            <View  style={styles.page}>

                {this.state.commentList.map((comment, index) => (
					<View style={styles.columnsComment}>
                        <Avatar 
                            rounded
                            title={comment.firstName.charAt(0).toUpperCase()+ comment.lastName.charAt(0).toUpperCase()} />
						
                        <View style={styles.detailComment}>
                            <Text style={styles.commentName}>{comment.firstName} {comment.lastName}</Text>
                            <Text>{comment.text}</Text>
                        </View>  

                        <RkButton rkType="socialPhotos" onPress={() => this.likeComment(index)}>
                                <Icon name='ios-heart' type='ionicon' color={Colors.red} />
                        </RkButton>                  
					
                    </View>						
                ))}       

                <Input style={styles.commentInput} placeholder='Ecrire un commentaire...' />


            </View>
        )
    }
}

export default Comments