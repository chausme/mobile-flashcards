import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'
import Deck from '../components/Deck'
import { white } from '../utils/colors'
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
            <ScrollView style={styles.generalView}>
                {decks.map((deck) => (
                    <Deck key={deck.title} title={deck.title} questions={deck.questions} navigation={navigation} />
                ))}
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    generalView: {
        flex: 1,
        backgroundColor: white,
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
