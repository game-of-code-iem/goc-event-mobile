import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { RkText } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/FontAwesome';
//Styles
import styles from './FloatingChoice.style'

class FloatingChoice extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showingChoices: false
        }
    }

    toggleChoices() {
        this.setState({ showingChoices: !this.state.showingChoices })
    }

    render() {
        console.log(this.state.showingChoices)
        return (
            <View style={styles.componentContainer}>
                <View style={styles.choicesContainer}>
                    {this.state.showingChoices &&
                        <TouchableOpacity onPress={() => this.props.callbackChoice(1)}>
                            <View style={styles.choiceButton}>
                                <RkText style={styles.choiceText}>{this.props.choice1}</RkText>
                            </View>
                        </TouchableOpacity>
                    }
                    {this.state.showingChoices &&
                        <TouchableOpacity onPress={() => this.props.callbackChoice(2)} >
                            <View style={styles.choiceButton}>
                                <RkText style={styles.choiceText}>{this.props.choice2}</RkText>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity onPress={() => this.toggleChoices()} style={styles.floatingButton}>
                    <View>
                        <Icon color='white' name='plus' size={22} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default FloatingChoice
