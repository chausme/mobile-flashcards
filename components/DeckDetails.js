import React from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import {
    fetchDeck,
    disableRedirectAction
} from '../actions'

class DeckDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.deckTitle
        }
    }

    componentDidMount() {
        this.props.disableRedirect()
        this.props.fetchDeck(this.props.navigation.state.params.deckTitle)
    }

    render() {

        Keyboard.dismiss()

        const deckTitle = this.props.navigation.state.params.deckTitle
        const deck = this.props.deck
        return (
            <View style={styles.deckDetails}>
                <Text>Deck Details for {this.props.navigation.state.params.deckTitle}</Text>
                <Text>{deck ? deck.questions.length : '0'} cards
                </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                  'AddCard',
                  { deckTitle: deckTitle }
                )}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )

    }

}

const styles = StyleSheet.create({
    deckDetails: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function mapStateToProps ({deck, general}) {
    return {
        deck: deck.deck,
        general: general
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    return {
        fetchDeck: (data) => dispatch(fetchDeck(data)),
        disableRedirect: () => dispatch(disableRedirectAction()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeckDetails)
