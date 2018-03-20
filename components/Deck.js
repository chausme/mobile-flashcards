import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Deck extends React.Component {

    render() {

        const { title, questions } = this.props

        return (
            <TouchableOpacity onPress={console.log('you clicked on deck!')}>
                <Text>{title}, {questions.length} cards</Text>
            </TouchableOpacity>
        );
    }

}
