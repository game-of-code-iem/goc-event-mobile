import React from 'react'
import {View, Text, FlatList} from 'react-native'
//Components
import EventItem from './EventItem'

class EventList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events: [{
                id: 1,
                title: "Mon Event 1",
                description: "Bonjour bienvenue dans mon superbe event",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                inviteCode: "G7F87DE"
            },
            {
                id: 2,
                title: "Mon Event 2",
                description: "Bonjour bienvenue dans mon autre superbe event",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                inviteCode: "7DFAB5C"
            },
            {
                id: 3,
                title: "Mon Event 3",
                description: "Bonjour bienvenue dans mon dernier event",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                inviteCode: "875E9D1"
            }]
        }
    }

    render() {
        return(
            <View>
                <FlatList
                    data={this.state.events}
                    renderItem={({item, index}) => {
                        return (
                            <EventItem key={item.id} event={item} type={index % 2 == 1 ? "default" : "reversed"} />
                        )
                    }}
                />
            </View>
        )
    }

}

export default EventList