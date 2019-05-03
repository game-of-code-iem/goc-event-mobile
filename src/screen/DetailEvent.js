import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	active: state.visibilityFilter
});

const mapDispatchToProps = (dispatch) => ({
	setVisibilityFilter: (body) => dispatch(setVisibilityFilter(body))
});

class DetailEvent extends Component {
	render() {
		return (
			<View>
				<Text> DetailEvent </Text>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);
