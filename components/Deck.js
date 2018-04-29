import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { gray, grayLight } from '../utils/colors'

export default class Deck extends React.Component {

    render() {

        const { title, questions, navigation } = this.props

        return (
            <View style={styles.deck}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                  'DeckDetails',
                  { deckTitle: title }
                )}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.cardsQuantity}>{questions ? questions.length : 0} cards</Text>
                </TouchableOpacity>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        borderBottomColor: grayLight,
        borderBottomWidth: 1
    },
    deckTitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    cardsQuantity: {
        color: gray,
        textAlign: 'center'
    }
})
