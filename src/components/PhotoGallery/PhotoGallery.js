import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { RkGallery, RkButton } from 'react-native-ui-kitten'
import { FileSystem } from 'expo';

//Styles
import styles from "./PhotoGallery.style"

class PhotoGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentImageSelected: {}
        }
    }

    renderGalleryHeader = (onRequestClose) => (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onRequestClose}>
                <Text style={styles.backLabel}>Retour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={this.downloadPicture}>
               <Text style={styles.backLabel}>Télécharger</Text>
            </TouchableOpacity>
        </View>
    )

    renderGalleryFooter = () => (
        <View>
          <RkButton rkType="pixEventBottom" style={styles.displayCommentButton} onPress={this.displayCommentsPhoto}>Afficher les commentaires</RkButton>
        </View>
      );
      
    displayCommentsPhoto = () => {
    };

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
        this.setState({
            currentImageSelected: item
        })
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
//renderGalleryHeader={(onRequestClose) => this.renderGalleryHeader(onRequestClose)} 
export default PhotoGallery