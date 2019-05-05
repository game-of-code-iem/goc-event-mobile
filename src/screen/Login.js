import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
//Styles & themes
import styles from './styles/Login.style';
import globalTheme from '../kitten-themes/Global.theme';
//Consts
import Colors from '../consts/Colors';
//Redux
import { connect } from 'react-redux';
import { login, register } from '../../Store/Actions/Connexion';

const mapStateToProps = (state) => ({
	response: state.connexion.Response
});

const mapDispatchToProps = (dispatch) => ({
	userLogin: (body) => dispatch(login(body)),
	userRegister: (body) => dispatch(register(body))
});

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mailError: false,
			passError: false
		};
	}

	static navigationOptions = {
		header: null
	};

	checkFields() {
		let mail = this.loginInput.inputRef._lastNativeText;
		let pass = this.passwordInput.inputRef._lastNativeText;
		if (mail && pass) {
			if (pass) this.setState({ passError: false });
			if (this.checkMail(mail)) {
				this.setState({ mailError: false });
				console.log('Mail is valid ! eady to continue login ad check password');
				this.buildPayload();
			} else {
				this.setState({ mailError: true });
				console.log('Invalid Email structure');
			}
		} else {
			if (mail == undefined || mail == '') {
				this.setState({ mailError: true });
			}
			if (pass == undefined || pass == '') {
				this.setState({ passError: true });
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.response.code == 200) {
			this.props.navigation.replace('ListEvent');
		}
	}

	buildPayload() {
		let data = {};
		data.mail = this.loginInput.inputRef._lastNativeText;
		data.password = this.passwordInput.inputRef._lastNativeText;
		this.props.userLogin({ data });
	}

	checkMail(mail) {
		if (mail != null) {
			return mail.includes('@');
		}
		return false;
	}

	userLogin() {
		this.checkFields();
	}

	renderIcon(icon) {
		return <Icon style={styles.guestIcon} name={icon} size={11} />;
	}

	render() {
		return (
			<View style={styles.page}>
				<View style={styles.screenContainer}>
					<View style={styles.logoContainer}>
						<Image style={styles.logo} source={require('../images/logo.png')} />
					</View>
					<View style={styles.loginFields}>
						<RkTextInput //INPUT LOGIN
							labelStyle={this.state.mailError ? { color: 'red' } : null}
							style={this.state.mailError ? { borderBottomColor: 'red' } : null}
							autoFocus={true}
							label={this.renderIcon('user')}
							placeholder="Identifiant"
							selectionColor={Colors.primary}
							textContentType="emailAddress"
							returnKeyType="next"
							keyboardType="email-address"
							onSubmitEditing={() => this.passwordInput.focusInput()}
							ref={(element) => {
								this.loginInput = element;
							}}
						/>
						<RkTextInput //INPUT PASSWORD
							labelStyle={this.state.passError ? { color: 'red' } : null}
							style={this.state.passError ? { borderBottomColor: 'red' } : null}
							label={this.renderIcon('lock')}
							placeholder="Mot de passe"
							selectionColor={Colors.primary}
							textContentType="password"
							secureTextEntry={true}
							onSubmitEditing={() => this.userLogin()}
							ref={(element) => {
								this.passwordInput = element;
							}}
						/>
						<RkButton style={styles.loginButton} rkType="pixEvent" onPress={() => this.userLogin()}>
							SE CONNECTER
						</RkButton>
					</View>
				</View>
				<View style={styles.bottomSigninButton}>
					<RkButton
						style={styles.signinButton}
						onPress={() => this.props.navigation.navigate('Register')}
						rkType="pixEventBottom"
					>
						INSCRIPTION
					</RkButton>
				</View>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
