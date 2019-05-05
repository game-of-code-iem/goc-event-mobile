import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { RkTextInput, RkButton } from 'react-native-ui-kitten'
import { SearchBar } from 'react-native-elements';
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
            uploadedImage: "a",
            search: "",
            showSearchResults: false,
            searchUsers: [
                {
                    id: 15,
                    firstName: 'Nils',
                    lastName: 'WILMET',
                    mail: 'nils.wilmet@gmail.com'
                },
                {
                    id: 5,
                    firstName: 'Clément',
                    lastName: 'MERLET',
                    mail: 'clement.merlet@gmail.com'
                },
                {
                    id: 8,
                    firstName: 'Morgane',
                    lastName: 'BOUSSERT',
                    mail: 'morgane.boussert@gmail.com'
                },
                {
                    id: 22,
                    firstName: 'Romaric',
                    lastName: 'ROUSSEL',
                    mail: 'romaric.roussel@gmail.com'
                }
            ],
            cEventId: 1,
            cEventTitle: "",
            cEventDescription: "",
            cEventGuests: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Nouvel événement',
            headerTintColor: Colors.primary,
        }
    }

    updateSearch(search) {
        this.setState({ search });
        if (search == "show") {
            this.setState({showSearchResults: true})
        } else if (this.state.showSearchResults) {
            this.setState({showSearchResults: false})
        }
    };

    renderIcon(icon) {
        return <Icon name={icon} size={11} />
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

    selectUser(user) {
        console.log("User selected:"+user.id)
        if (!this.state.cEventGuests.includes(user)) {
            console.log("adding "+user.mail+" to array")
        }
        this.state.cEventGuests.push(user)
    }

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
                <View style={styles.guestsComponent}>
                    <SearchBar
                        placeholder="Search..."
                        onChangeText={search => this.updateSearch(search)}
                        lightTheme={true}
                        value={this.state.search}
                    />
                    {this.state.showSearchResults && this.state.searchUsers && 
                        <View style={styles.userResultBox}>
                            {this.state.searchUsers.map(user => (
                                <TouchableOpacity style={styles.userNames} onPress={() => this.selectUser(user)}>
                                    <Text key={user.id}>{user.firstName + " " + user.lastName}</Text>
                                </TouchableOpacity>
                            ))}
                        </View> 
                    }
                    <View style={styles.selectedGuestsBox}>
                        
                    </View>
                    <FlatList
                        data={this.state.cEventGuests}
                        renderItem={({item}) => (<Text>moo</Text>)}
                    />
                </View>
                <View style={styles.buttonBottom}>
                    <RkButton style={styles.submitForm} onPress={() => console.log("Send new event")} rkType="pixEventBottom">TERMINER</RkButton>
                </View>
            </View>
        )
    }
}
/*
<View style={styles.selectedUserItem}>                                
    <Text>{item.firstName + " " + item.lastName}</Text>
    <TouchableOpacity><Icon color={Colors.red} name="times-circle-o" size={18} /></TouchableOpacity>
</View>
*/

export default WorkbenchEvent