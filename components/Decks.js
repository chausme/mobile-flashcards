import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Deck from '../components/Deck'
import {
    fetchDecks
} from '../actions'

class Decks extends React.Component {

    componentDidMount() {
        this.props.fetchDecks()
    }

    render() {

        const navigation = this.props.navigation

        let decks = this.props.decks

        return (
            <View style={styles.deckList}>
                {decks.map((deck) => (
                    <Deck key={deck.title} title={deck.title} questions={deck.questions} navigation={navigation} />
                ))}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    deckList: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function mapStateToProps ({decks}) {

    return {
        decks: Object.values(decks),
    }

}

function mapDispatchToProps (dispatch) {
    return {
        fetchDecks: () => dispatch(fetchDecks())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Decks)
