import React, {Component} from 'react'
import {View, Text} from 'react-native'

class EntryDetails extends Component{
    render() {
        return (
            <View>
                <Text>Entry Detail - { this.props.navigation.state.params.entryId}</Text>
            </View>
        )
    }
}

export default EntryDetails;