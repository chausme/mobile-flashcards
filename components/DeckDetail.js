import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DeckDetail extends React.Component {

    render() {

        //const { title, questions } = this.props

        return (
            <View>
                <Text>Deck Details for {this.props.navigation.state.params.deckTitle}</Text>
            </View>
        );
    }

}
