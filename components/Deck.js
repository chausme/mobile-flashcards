import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Deck extends React.Component {

    render() {

        const { title, questions, navigation } = this.props

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'DeckDetails',
              { deckTitle: title }
            )}>
                <Text>{title}, {questions ? questions.length : 0} cards</Text>
            </TouchableOpacity>
        );
    }

}
