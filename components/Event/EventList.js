import React from 'react'
import { View, Text, FlatList } from 'react-native'
//Components
import EventItem from './EventItem'

class EventList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events: [{
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
                id: 3,
                title: "Mon Event 4",
                description: "Bonjour bienvenue dans mon tout dernier event de la liste !",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=",
                inviteCode: "78EFB12",
                guests: 425,
                status: "UNAVAILABLE"
            }]
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.events}
                    renderItem={({ item, index }) => {
                        return (
                            <EventItem key={item.id} event={item} type="default" />
                        )
                    }}
                />
            </View>
        )
    }

}

export default EventList