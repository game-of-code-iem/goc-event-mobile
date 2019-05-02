import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../consts/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { RkButton, RkTextInput } from 'react-native-ui-kitten'
//Styles
import styles from './styles/Register.style'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mailError: false,
            fnError: false,
            lnError: false,
            passError: false,
            passChError: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {

            title: 'Inscription',
            headerTintColor: Colors.primary,
        }
    }

    componentDidMount() {

    }

    renderIcon(icon) {
        return <Icon name={icon} size={11} />
    }

    render() {
        return (
            <View style={styles.registerContainer}>
                <View style={styles.formContainer}>
                    <RkTextInput //INPUT MAIL
                        labelStyle={this.state.mailError ? { color: 'red' } : null}
                        style={[styles.formInput, this.state.mailError ? { borderBottomColor: 'red' } : null]}
                        autoFocus={true}
                        label={this.renderIcon('user')}
                        placeholder='Adresse e-mail'
                        selectionColor={Colors.primary}
                        textContentType="emailAddress"
                        returnKeyType="next"
                        keyboardType="email-address"
                        ref={(element) => { this.mailInput = element }}
                        onSubmitEditing={() => this.fnInput.focusInput()}
                    />
                    <RkTextInput //INPUT FIRSTNAME
                        labelStyle={this.state.fnError ? { color: 'red' } : null}
                        style={[styles.formInput, this.state.fnError ? { borderBottomColor: 'red' } : null]}
                        label={this.renderIcon('user')} //MOD
                        placeholder='Prénom'
                        selectionColor={Colors.primary}
                        textContentType="givenName"
                        returnKeyType="next"
                        keyboardType="email-address"
                        ref={(element) => { this.fnInput = element }}
                        onSubmitEditing={() => this.lnInput.focusInput()}
                    />
                    <RkTextInput //INPUT LASTNAME
                        labelStyle={this.state.lnError ? { color: 'red' } : null}
                        style={[styles.formInput, this.state.lnError ? { borderBottomColor: 'red' } : null]}
                        label={this.renderIcon('user')} //MOD
                        placeholder='Nom'
                        selectionColor={Colors.primary}
                        textContentType="familyName"
                        returnKeyType="next"
                        keyboardType="email-address"
                        ref={(element) => { this.lnInput = element }}
                        onSubmitEditing={() => this.passwordInput.focusInput()}
                    />
                    <RkTextInput //INPUT PASSWORD
                        labelStyle={this.state.passError ? { color: 'red' } : null}
                        style={[styles.formInput, this.state.passError ? { borderBottomColor: 'red' } : null]}
                        label={this.renderIcon('lock')} //MOD
                        placeholder='Mot de passe'
                        returnKeyType="next"
                        selectionColor={Colors.primary}
                        textContentType="password"
                        secureTextEntry={true}
                        ref={(element) => { this.passwordInput = element }}
                        onSubmitEditing={() => this.passwordCheckInput.focusInput()}
                    />

                    <RkTextInput //INPUT PASSWORD CHECK
                        labelStyle={this.state.passChError ? { color: 'red' } : null}
                        style={[styles.formInput, this.state.passChError ? { borderBottomColor: 'red' } : null]}
                        label={this.renderIcon('lock')} //MOD
                        placeholder='Vérification du mot de passe'
                        selectionColor={Colors.primary}
                        textContentType="password"
                        secureTextEntry={true}
                        ref={(element) => { this.passwordCheckInput = element }}
                        onSubmitEditing={() => console.log("dsd")}
                    />
                </View>
                <View style={styles.buttonBottom}>
                    <RkButton style={styles.submitForm} onPress={() => console.log('Ready to submit register form')} rkType="pixEventBottom">TERMINER</RkButton>
                </View>
            </View>
        )
    }
}
