import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Colors from '../consts/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RkButton, RkTextInput } from 'react-native-ui-kitten';
//Styles
import styles from './styles/Register.style';
//Redux
import { connect } from 'react-redux';
import { register } from '../../Store/Actions/Connexion';
import reactotron from 'reactotron-react-native';

const mapStateToProps = (state) => ({
	response: state.Response
});

const mapDispatchToProps = (dispatch) => ({
	registerUser: (body) => dispatch(register(body))
});

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mailError: false,
			fnError: false,
			lnError: false,
			passError: false,
			passChError: false
		};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Inscription',
			headerTintColor: Colors.primary
		};
	};

	userRegister() {
		this.checkFields();
	}

	checkFields() {
		let mail = this.mailInput.inputRef._lastNativeText;
		let pass = this.passwordInput.inputRef._lastNativeText;
		let passCh = this.passwordCheckInput.inputRef._lastNativeText;
		if (mail && pass && passCh) {
			this.setState({ passError: false, passChError: false });
			if (mail.includes('@')) {
				this.setState({ mailError: false });
				if (pass != passCh) {
					this.setState({ passChError: true });
					console.log("Pass doesn't match");
				} else {
					this.buildPayload();
				}
			} else {
				console.log('Mauvaise structure de mail');
				this.setState({ mailError: true });
			}
		} else {
			if (!mail) {
				this.setState({ mailError: true });
			} else {
				if (mail.includes('@')) this.setState({ mailError: false });
			}
			if (!pass) {
				this.setState({ passError: true });
			} else {
				this.setState({ passError: false });
			}
			if (!passCh) {
				this.setState({ passChError: true });
			} else {
				this.setState({ passChError: false });
			}
		}
	}

	buildPayload() {
		let data = {};
		data.mail = this.mailInput.inputRef._lastNativeText;
		data.firstName = this.fnInput.inputRef._lastNativeText ? this.fnInput.inputRef._lastNativeText : '';
		data.lastName = this.lnInput.inputRef._lastNativeText ? this.lnInput.inputRef._lastNativeText : '';
		data.password = this.passwordInput.inputRef._lastNativeText;
		data.login = this.mailInput.inputRef._lastNativeText;
		this.props.registerUser({ data });
	}

	renderIcon(icon) {
		return <Icon name={icon} size={11} />;
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.response.code == '201' && this.props.response.type == 'WEBSOCKET:R:REGISTER') {
			reactotron.log('cdup', this.props.response);
			this.props.navigation.pop(1);
		}
	}

	render() {
		return (
			<View style={styles.registerContainer}>
				<View style={styles.formContainer}>
					<RkTextInput //INPUT MAIL
						labelStyle={this.state.mailError ? { color: 'red' } : null}
						style={[ styles.formInput, this.state.mailError ? { borderBottomColor: 'red' } : null ]}
						autoFocus={true}
						label={this.renderIcon('envelope')}
						placeholder="Adresse e-mail"
						selectionColor={Colors.primary}
						textContentType="emailAddress"
						returnKeyType="next"
						keyboardType="email-address"
						ref={(element) => {
							this.mailInput = element;
						}}
						onSubmitEditing={() => this.fnInput.focusInput()}
					/>
					<RkTextInput //INPUT FIRSTNAME
						labelStyle={this.state.fnError ? { color: 'red' } : null}
						style={[ styles.formInput, this.state.fnError ? { borderBottomColor: 'red' } : null ]}
						label={this.renderIcon('address-card')}
						placeholder="Prénom"
						selectionColor={Colors.primary}
						textContentType="givenName"
						returnKeyType="next"
						keyboardType="email-address"
						ref={(element) => {
							this.fnInput = element;
						}}
						onSubmitEditing={() => this.lnInput.focusInput()}
					/>
					<RkTextInput //INPUT LASTNAME
						labelStyle={this.state.lnError ? { color: 'red' } : null}
						style={[ styles.formInput, this.state.lnError ? { borderBottomColor: 'red' } : null ]}
						label={this.renderIcon('address-card')}
						placeholder="Nom"
						selectionColor={Colors.primary}
						textContentType="familyName"
						returnKeyType="next"
						keyboardType="email-address"
						ref={(element) => {
							this.lnInput = element;
						}}
						onSubmitEditing={() => this.passwordInput.focusInput()}
					/>
					<RkTextInput //INPUT PASSWORD
						labelStyle={this.state.passError ? { color: 'red' } : null}
						style={[ styles.formInput, this.state.passError ? { borderBottomColor: 'red' } : null ]}
						label={this.renderIcon('lock')}
						placeholder="Mot de passe"
						returnKeyType="next"
						selectionColor={Colors.primary}
						textContentType="password"
						secureTextEntry={true}
						ref={(element) => {
							this.passwordInput = element;
						}}
						onSubmitEditing={() => this.passwordCheckInput.focusInput()}
					/>

					<RkTextInput //INPUT PASSWORD CHECK
						labelStyle={this.state.passChError ? { color: 'red' } : null}
						style={[ styles.formInput, this.state.passChError ? { borderBottomColor: 'red' } : null ]}
						label={this.renderIcon('lock')}
						placeholder="Vérification du mot de passe"
						selectionColor={Colors.primary}
						textContentType="password"
						secureTextEntry={true}
						ref={(element) => {
							this.passwordCheckInput = element;
						}}
						onSubmitEditing={() => this.userRegister()}
					/>
				</View>
				<View style={styles.buttonBottom}>
					<RkButton style={styles.submitForm} onPress={() => this.userRegister()} rkType="pixEventBottom">
						TERMINER
					</RkButton>
				</View>
			</View>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
