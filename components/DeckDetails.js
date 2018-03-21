import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import {
    fetchDeck
} from '../actions'

class DeckDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.state.params.deckTitle
      }
    }

    componentDidMount() {
        this.props.fetchDeck(this.props.deckTitle)
    }

    render() {

        const deck = this.props.deck

        if (deck) {
            return (
                <View style={styles.deckDetails}>
                    <Text>Deck Details for {deck.title}</Text>
                    <Text>{deck.questions.length} cards</Text>
                    <Text>[button] Add Card</Text>
                    <Text>[button] Start Quiz</Text>
                </View>
            )
        }
        return null

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

function mapStateToProps (state, { navigation }) {
    const { deckTitle } = navigation.state.params

    return {
        deckTitle,
        deck: state.deck.deck
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    return {
        fetchDeck: (data) => dispatch(fetchDeck(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeckDetails)
