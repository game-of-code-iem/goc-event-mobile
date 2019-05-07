import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
//Components
import EventItem from './EventItem';

class EventList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	onEventItemClick(id) {
		this.props.callbackItemClick(id);
	}

	render() {
		return (
			<View>
				<FlatList
					data={this.props.events}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity onPress={() => this.onEventItemClick(index)}>
								<EventItem key={item.id} event={item} type="default" />
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		);
	}
}

export default EventList;
