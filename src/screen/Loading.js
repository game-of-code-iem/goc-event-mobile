import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
	active: state.visibilityFilter
});

const mapDispatchToProps = (dispatch) => ({
	setVisibilityFilter: (body) => dispatch(setVisibilityFilter(body))
});


class Loading extends Component {

    constructor(props){
        super(props)
        this.state = {status:"400"}
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.response.status == "200") {
            this.props.navigation.navigate('Login')
        } 
    }
    
    render() {
        return (
            <View>
                <Text> Loading ...</Text>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
