import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { RkTextInput, RkButton, RkText, RkSwitch } from 'react-native-ui-kitten'
import { SearchBar, Divider } from 'react-native-elements';
import { ImagePicker, Permissions, Constants } from 'expo';
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
            showFirstResult: false,
            searchUsers: [],
            cEventId: 1,
            cEventTitle: "",
            cEventDescription: "",
            cEventGuests: [],
            cEventIsDraft: false,
            gotCameraRollPerm: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Nouvel événement',
            headerTintColor: Colors.primary,
        }
    }

    async componentDidMount() {
        // SOCKET
        // Get Event by Id => this.state (cEventId, cEventTitle, cEventGuests...) 

        this.askCameraRollPermission()

    }

    async askCameraRollPermission() {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'granted') {
                console.log("CAMERA ROLL PERMISSION GRANTED")
                this.setState({ gotCameraRollPerm: true })
            }
        } else {
            console.log("CAMERA ROLL PERMISSION MISSING")
            this.setState({ gotCameraRollPerm: false })
        }
    }

    updateSearch(search) {
        this.setState({ search });
        if (search == "Ok") { //La recherche a des résultats : on affiche les résultats et on cache l'ajout d'un user désincris
            this.setState({
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
                    },
                    {
                        id: 44,
                        firstName: 'Thomas',
                        lastName: 'PETITJEAN',
                        mail: 'thomas.petitjean@gmail.com'
                    }
                ]
            })
            this.setState({ showSearchResults: true })
            this.setState({ showFirstResult: false })
        } else { //La recherche n'affiche pas de résultats
            this.setState({ searchUsers: [] })
        }
        if (this.state.searchUsers.length == 0 && search != "") { //Mais si la recherche n'affiche pas de résultats ET est != de "", on affiche la possiblité d'ajouter une personne désinscrite
            this.setState({ showFirstResult: true })
        }
        if (search == "") { //Sinon si search est à "" on ferme aussi la possibilité d'ajouter une personne désinscrite 
            this.setState({ showFirstResult: false })
        }
    };

    renderIcon(icon) {
        return <Icon name={icon} size={11} />
    }

    _pickImage = async () => {
        if (Constants.platform == 'ios') {
            console.log("on ios, asking Cam Roll Permission")
            this.askCameraRollPermission()
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        }).catch(e => {
            this.askCameraRollPermission()
            console.log(e)
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ uploadedImage: result.uri });
            this.imageInput.source = result.uri
        }
    };

    selectUser(user) {
        console.log("User selected:" + user.id)
        if (this.state.cEventGuests.filter(item => { return item.id === user.id }).length > 0) {
        } else {
            userArray = this.state.cEventGuests
            userArray.push(user)
            this.setState({ cEventGuests: userArray })
        }
    }

    deleteUserFromList(userId) {
        let userArray = this.state.cEventGuests.filter(user => {
            return user.id != userId
        })
        this.setState({ cEventGuests: userArray })
        //API
        //Enlever l'user de l'event
    }

    onIsDraftChange(state) {
        console.log(state)
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
                <View>
                    <RkText>Enregistrer en brouillon</RkText>
                    <RkSwitch
                        value={this.state.cEventIsDraft}
                        onValueChange={(state) => this.onIsDraftChange(state)}
                    />
                </View>
                <View style={styles.guestsComponent}>
                    <Text style={styles.titleGuests}>Participants</Text>
                    <SearchBar
                        placeholder="Rechercher un utilisateur..."
                        onChangeText={search => this.updateSearch(search)}
                        lightTheme={true}
                        value={this.state.search}
                    />
                    {/*this.state.showFirstResult ? <TouchableOpacity style={}><Text>Ajouter </Text><Text style={styles.addUnsubscribedUser}>{this.state.search}</Text></TouchableOpacity> : null*/}
                    {this.state.showSearchResults && this.state.searchUsers &&
                        <View style={styles.userResultBox}>
                            <FlatList
                                extraData={this.state}
                                data={this.state.searchUsers}
                                renderItem={({ item, index }) => (
                                    <View style={styles.userNames}>
                                        <TouchableOpacity onPress={() => this.selectUser(item)}><Text>{item.firstName + " " + item.lastName}</Text></TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    }

                    <View style={styles.selectedGuestsBox}>
                        {this.state.cEventGuests.length != 0 ?
                            <FlatList
                                extraData={this.state}
                                data={this.state.cEventGuests}
                                renderItem={({ item, index }) => (
                                    <View style={styles.selectedUserItem}>
                                        <View style={styles.selectedUserItemView}>
                                            <Text>{item.firstName + " " + item.lastName}</Text>
                                            <TouchableOpacity onPress={() => this.deleteUserFromList(item.id)}><Icon color={Colors.red} name="times-circle-o" size={22} /></TouchableOpacity>
                                            {this.state.cEventGuests.length != index ? <Divider style={{ backgroundColor: 'blue' }} /> : null}
                                        </View>
                                    </View>
                                )}
                            /> : <Text style={styles.nobodyFound}>Aucun participant...</Text>}
                    </View>

                </View>
                <View style={styles.buttonBottom}>
                    <RkButton style={styles.submitForm} onPress={() => console.log("Send new event")} rkType="pixEventBottom">TERMINER</RkButton>
                </View>
            </View>
        )
    }
}
/*

*/

export default WorkbenchEvent