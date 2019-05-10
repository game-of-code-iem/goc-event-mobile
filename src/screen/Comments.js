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
                    mail: "",
                    hasLike: true,
                    likeList: [
                        {
                            idUser: "bbb"
                        },
                        {
                            idUser: "aaa"
                        }
                    ]
                },
                {
                    id: "ddd",
                    idUser: "bbb",
                    date: "1155554889",
                    text: "Bonjour",
                    firstName: "Jean-mi",
                    lastName: "Test",
                    mail: "",
                    hasLike: false,
                    likeList: []
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


    // LIKES

    likeComment(index) {
        var idUser = "aaa"

        if (this.state.commentList[index].likeList.filter(item => { return item.idUser == idUser }).length > 0) {
            // le user a déjà liké le commentaire => on l'enlève

            var newCommentList = this.state.commentList
            newCommentList[index].hasLike = false
            this.setState({
                commentList: newCommentList
            }, this.removeFromLikelist(idUser, index))

        } else {
            // le user n'a pas déjà liké le commentaire => on le met
            var newCommentList = this.state.commentList
            newCommentList[index].hasLike = true
            this.setState({
                commentList: newCommentList
            }, this.addInLikelist(index))
        }
    }

    addInLikelist(index) {
        var newCommentList = this.state.commentList
        newCommentList[index].likeList.push({ idUser: "aaa" })
        this.setState({
            commentList: newCommentList
        })
        console.log("add in likelist modified :" + JSON.stringify(this.state.commentList))
    }

    removeFromLikelist(id, index) {
        var idUser = "aaa"
        var newCommentList = this.state.commentList

        var likelist = newCommentList[index].likeList
        likelist = likelist.filter(item => { return item.idUser != idUser })

        newCommentList[index].likeList = likelist

        //  newCommentList[index] = newCommentList[index].filter(item => { return item.idUser != idUser })
        console.log("remove from likelist modified :" + JSON.stringify(newCommentList))
        this.setState({
            commentList: newCommentList
        })

    }


    // COMMENTAIRE

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
                                <Text style={styles.countLikes}> {comment.likeList.length.toString()} </Text>
                                {comment.hasLike ? <Icon style={{ alignSelf: "flex-end" }} name='ios-heart' type='ionicon' color={Colors.red} />
                                    : <Icon style={{ alignSelf: "flex-end" }} name='ios-heart-empty' type='ionicon' color={Colors.red} />
                                }
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