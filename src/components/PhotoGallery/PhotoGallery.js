import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { RkGallery, RkButton } from 'react-native-ui-kitten'
import { FileSystem } from 'expo';
import { Icon } from 'react-native-elements';

//Styles
import styles from "./PhotoGallery.style"

class PhotoGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "aaa",
            hasLike: false,
            uri: "",
            userId: "",
            firstName: "",
            lastName: "",
            likeList: [
                { idUser: "bbb" }
            ]
        }        
    }

    renderGalleryHeader = (onRequestClose) => (
        <View style={styles.headerContainer}>

            <RkButton rkType="socialPhotos" onPress={onRequestClose}>
                <Icon name='arrow-back' type='material' color="white"/>
            </RkButton>

        </View>
    )

    renderGalleryFooter = () => (
        <View style={styles.galleryFooter}>

            <RkButton rkType="socialPhotos" onPress={() => this.likePicture()}>
            {this.state.hasLike ? <Icon name='ios-heart' type='ionicon' color="white"/> :  <Icon name='ios-heart-empty' type='ionicon' color="white"/> 
			}    
            </RkButton>

          <RkButton rkType="socialPhotos" onPress={() => this.displayCommentsPhoto()}>
                <Text>{this.state.likeList.length}</Text>
                <Icon name='comments' type='foundation' color="white"/>
          </RkButton>

          <RkButton rkType="socialPhotos" onPress={() => this.downloadPicture()}>
                 <Icon name='download' type='font-awesome' color="white"/>
            </RkButton>

        </View>
      );
      
    displayCommentsPhoto() {
    };

    likePicture(){
        var idUser = "aaa"

        if (this.state.likeList.filter(item => {return item.idUser == idUser}).length > 0) {
            this.setState({
                hasLike: false                   
            }, this.removeFromLikelist(idUser))  
                            
        } else {
            // le user n'a pas déjà liké la photo
            this.setState({
                hasLike: true
            })
            this.addInLikeList()  
        }
    }

    addInLikeList(){
        var likelistModified = this.state.likeList
        likelistModified.push({idUser: "aaa"})
		this.setState({
		    likeList: likelistModified
        })
        console.log("add in likelist modified :"+JSON.stringify(this.state.likeList))
    }

    removeFromLikelist(id){
        var idUser = "aaa"
        var likelistModified = this.state.likeList

        likelistModified = likelistModified.filter(item => {return item.idUser != idUser})
        console.log("remove from likelist modified :"+JSON.stringify(likelistModified))
		this.setState({
		    likeList: likelistModified
        })
       
    }

    downloadPicture(uri){
        console.log('downloadPicture - uri image : '+this.state.currentImageSelected.uri)
        FileSystem.downloadAsync(this.state.currentImageSelected.uri, FileSystem.documentDirectory + 'event1.'+this.state.currentImageSelected.ext)
        .then(({ uri }) => {
            console.log('Téléchargement fini à : ', uri)
        })
        .catch(error => {
            console.log('error : ', error)
        })
    }

    onGridItemClick = (item, index) => {
        console.log('onGridItemClick - item : '+item.uri)
        // this.setState({
        //     id: item.id,
        //     hasLike: item.hasLike,
        //     uri: item.uri,
        //     userId: item.userId,
        //     firstName: item.firstName,
        //     lastName: item.lastName,
        //     likeList: item.likeList
        // })
    }

    render() {
        return (
            <View style={styles.photoContainer}>
                <RkGallery 
                    items={this.props.photos}
                    onGridItemClick={this.onGridItemClick}
                    renderGalleryHeader={this.renderGalleryHeader}
                    renderGalleryFooter={this.renderGalleryFooter} />
            </View>
        )
    }
}

export default PhotoGallery