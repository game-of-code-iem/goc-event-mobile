import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { RkTextInput, RkButton } from 'react-native-ui-kitten'
import { ImagePicker } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
//Styles & consts
import styles from "./styles/WorkbenchEvent.style"
import Colors from "../consts/Colors"

class WorkbenchEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            titleError: false,
            descError: false,
            uploadedImage: "",

        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Nouvel événement',
            headerTintColor: Colors.primary,
        }
    }

    renderIcon(icon) {
        return <Icon style={styles.guestIcon} name={icon} size={11} />
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ uploadedImage: result.uri });
            this.imageInput.source = result.uri
        }
    };

    render() {
        return (
            <View style={styles.workbenchContainer}>
                <View style={styles.workbenchInfoHeader}>
                    <TouchableOpacity onPress={() => this._pickImage()}>
                        <View style={styles.infoHeaderImage}>
                            <Image style={{ width: 100, height: 100 }} ref={(element) => { this.imageInput = element }} source={{ uri: this.state.uploadedImage }} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.infoHeaderInputs}>
                        <RkTextInput //INPUT TITLE
                            labelStyle={this.state.titleError ? { color: 'red' } : null}
                            style={this.state.titleError ? { borderBottomColor: 'red' } : null}
                            autoFocus={true}
                            label={this.renderIcon('tag')}
                            placeholder='Titre'
                            selectionColor={Colors.primary}
                            returnKeyType="next"
                            onSubmitEditing={() => this.descInput.focusInput()}
                            ref={(element) => { this.loginInput = element }}
                        />
                        <RkTextInput //INPUT DESCRIPTION
                            labelStyle={this.state.descError ? { color: 'red' } : null}
                            style={this.state.descError ? { borderBottomColor: 'red' } : null}
                            label={this.renderIcon('tags')}
                            placeholder='Description'
                            multiline={true}
                            selectionColor={Colors.primary}
                            ref={(element) => { this.descInput = element }}
                        />
                    </View>
                </View>
                <View>

                </View>
                <View style={styles.buttonBottom}>
                    <RkButton style={styles.submitForm} onPress={() => console.log("Send new event")} rkType="pixEventBottom">TERMINER</RkButton>
                </View>
            </View>
        )
    }
}

export default WorkbenchEvent