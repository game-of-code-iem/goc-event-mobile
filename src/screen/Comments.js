import React, { Component } from 'react'
import { Text, View, KeyboardAvoidingView } from 'react-native'
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
            firstName: "Utilisateur",
            lastName: "Connecte",
            mail: "user@connecte.fr",
            commentValue: "",
            commentList: [
                {
                    id: "ccc",
                    idUser: "bbb",
                    date: "1155554889",
                    text: "Coucou",
                    firstName: "Momo",
                    lastName: "Boussert",
                    mail: ""
                },
                {
                    id: "ddd",
                    idUser: "bbb",
                    date: "1155554889",
                    text: "Bonjour",
                    firstName: "Jean-mi",
                    lastName: "Test",
                    mail: ""
                }
            ]
        }
    }

    // NAV BAR
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Commentaires',
            header: null,
            headerLeft: null,
            headerRight: null,
        };
    };

    likeComment(index) {

    }

    publishComment() {
        var newCommentList = this.state.commentList
        newCommentList.push({
            idUser: "aaa",
            date: "",
            text: this.state.commentValue,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            mail: this.state.mail
        })

        this.setState({
            commentList: newCommentList
        })
    }

    closeCommentsPage() {
        this.props.navigation.goBack();
    }

    render() {
        return (

            <View style={styles.page}>

                <View style={styles.commentPart}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Commentaires</Text>
                        <Avatar
                            rounded overlayContainerStyle={{ backgroundColor: Colors.primary }}
                            title={this.state.commentList.length.toString()}></Avatar>

                        <RkButton style={styles.closeIcon} rkType="socialPhotos" onPress={() => this.closeCommentsPage()}>
                            <Icon style={{ alignSelf: "flex-end" }} name='ios-close' type='ionicon' size={30} />
                        </RkButton>

                    </View>

                    {this.state.commentList.map((comment, index) => (
                        <View style={styles.columnsComment}>
                            <Avatar
                                rounded
                                title={comment.firstName.charAt(0).toUpperCase() + comment.lastName.charAt(0).toUpperCase()} />

                            <View style={styles.detailComment}>
                                <Text style={styles.commentName}>{comment.firstName} {comment.lastName}</Text>
                                <Text style={styles.commentText}>{comment.text}</Text>
                            </View>

                            <RkButton style={styles.likeIcon} rkType="socialPhotos" onPress={() => this.likeComment(index)}>
                                <Text style={styles.countLikes}>13</Text>
                                <Icon style={{ alignSelf: "flex-end" }} name='ios-heart' type='ionicon' color={Colors.red} />
                            </RkButton>

                        </View>
                    ))}
                </View>

                <View style={styles.inputRow}>
                    <Input
                        onChangeText={(commentValue) => this.setState({ commentValue })}
                        value={this.state.commentValue}
                        containerStyle={styles.commentInput}
                        inputContainerStyle={styles.commentInsideInput}
                        placeholder='Ecrire un commentaire...' />
                    <RkButton style={styles.publishButton} rkType="socialPhotos" onPress={() => this.publishComment()}>
                        <Icon name='md-arrow-forward' type='ionicon' />
                    </RkButton>
                </View>


            </View>
        )
    }
}

export default Comments