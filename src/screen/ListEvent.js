import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarCodeScanner, Permissions } from 'expo';
import DialogInput from 'react-native-dialog-input';
//CustomComponents
import EventList from '../components/Event/EventList'
import FloatingChoice from '../components/FloatingChoice/FloatingChoice'
//Styles and consts
import styles from './styles/ListEvent.style'
import Colors from '../consts/Colors';

class ListEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [
                {
                    id: 1,
                    title: "Mon Event 1",
                    description: "Bonjour bienvenue dans mon superbe event qui va jusqu'au bout de la niiiiiight",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                    inviteCode: "G7F87DE",
                    guests: 78,
                    status: "OPEN",
                },
                {
                    id: 2,
                    title: "Mon Event 2",
                    description: "Bonjour bienvenue dans mon autre superbe event",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                    inviteCode: "7DFAB5C",
                    guests: 42,
                    status: "PREPARING"
                },
                {
                    id: 3,
                    title: "Mon Event 3",
                    description: "Coucou ! et bienvenue dans mon troisième event",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                    inviteCode: "875E9D1",
                    guests: 102,
                    status: "ENDED"
                },
                {
                    id: 4,
                    title: "Mon Event 4",
                    description: "Bonjour bienvenue dans mon tout dernier event de la liste !",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                    inviteCode: "78EFB12",
                    guests: 425,
                    status: "UNAVAILABLE"
                },
                {
                    id: 5,
                    title: "Mon Event 1",
                    description: "Bonjour bienvenue dans mon superbe event qui va jusqu'au bout de la niiiiiight",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                    inviteCode: "G7F87DE",
                    guests: 78,
                    status: "OPEN",
                },
                {
                    id: 6,
                    title: "Mon Event 2",
                    description: "Bonjour bienvenue dans mon autre superbe event",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                    inviteCode: "7DFAB5C",
                    guests: 42,
                    status: "PREPARING"
                },
                {
                    id: 7,
                    title: "Mon Event 3",
                    description: "Coucou ! et bienvenue dans mon troisième event",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                    inviteCode: "875E9D1",
                    guests: 102,
                    status: "ENDED"
                },
                {
                    id: 8,
                    title: "Mon Event 4",
                    description: "Bonjour bienvenue dans mon tout dernier event de la liste !",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                    inviteCode: "78EFB12",
                    guests: 425,
                    status: "UNAVAILABLE"
                }],
            isScanningCode: false,
            isDialogVisible: false
        }
    }

    onEventItemClick(id) {
        console.log("ListEvent:onEventItemClick", id)
        //TODO La navigation vers le detail de l'event
    }

    onFloatingButtonChoice(id) {
        console.log("ListEvent:onFloatingButtonChoice", id)
        switch (id) {
            case 1:
                this.setState({ isScanningCode: true })
                break;
            case 2:
                this.toggleDialog()
                break;
            case 3:
                console.log("Créer un event...")
                this.props.navigation.navigate('WorkbenchEvent')
                break;
        }
    }

    onDialogInputData(data) {
        console.log("Code d'invitation reçu : ", data)
        //TODO traiter le code d'invitation
        this.toggleDialog()
    }

    toggleDialog() {
        this.setState({ isDialogVisible: !this.state.isDialogVisible })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Mes événements',
            headerTintColor: Colors.primary,
            headerRight: (
                <View>
                    <TouchableOpacity style={styles.topBarIcon} onPress={() => console.log("Disconnecting...")} >
                        <Icon
                            name="sign-out"
                            size={28} />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress());
        //TODO Recupérer la liste des events
    }

    handleBarCodeScanned = ({ type, data }) => {
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.setState({ isScanningCode: false })
        //TODO Traiter les données du QR Code, laisser la caméra et afficher un toast d'erreur si la data du code QR ne respecte pas la stucture !
    }

    changeHeaderTitle(title) {
        const { setParams } = this.props.navigation;
        setParams({ title: title })
    }

    handleBackPress() {
        if (this.state.isScanningCode) {
            this.setState({ isScanningCode: false })
        }
    }

    render() {
        return (
            <View>
                <EventList callbackItemClick={id => this.onEventItemClick(id)} events={this.state.events} />
                <FloatingChoice style={styles.floatingButton} callbackChoice={val => this.onFloatingButtonChoice(val)} choice1="Par QRCode" choice2="Par code secret" choice3="Créer un event" />
                {this.state.isScanningCode &&
                    <BarCodeScanner
                        onBarCodeScanned={this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFill}
                    />
                }
                <DialogInput
                    isDialogVisible={this.state.isDialogVisible}
                    title={"Code d'invitation"}
                    message={"Veuillez entrer le code de l'événement qui vous a été communiqué"}
                    hintInput={"Code..."}
                    submitInput={(inputText) => { this.onDialogInputData(inputText) }}
                    closeDialog={() => { this.toggleDialog() }}
                    submitText="OK"
                    cancelText="Annuler"
                >
                </DialogInput>
            </View>
        )
    }
}

export default ListEvent