import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import AddDeckForm from './AddDeckForm'
import { NavigationActions } from 'react-navigation'
import {
    addDeck
} from '../actions'

class AddDeck extends React.Component {

    componentDidUpdate(prevProps) {

        console.log('add dedck this prpos')
        console.log(this.props);

        if (prevProps !== this.props) {
            if (this.props.general.redirect && this.props.deck !== undefined) {

                this.props.navigation.dispatch(NavigationActions.navigate({
                    routeName: 'DeckDetails',
                    params: {deckTitle: this.props.general.redirect},
                }))

            }
        }
    }

    render() {

        const { addDeck } = this.props

        return (
            <View style={styles.addDeck}>
                <Text>What is the title of your new deck?</Text>
                <AddDeckForm onSubmit={addDeck} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    addDeck: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function mapStateToProps ({decks, deck, general}) {

    return {
        deck: deck,
        decks: decks,
        general: general
    }

}

function mapDispatchToProps (dispatch) {
    return {
        addDeck: (data) => dispatch(addDeck(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDeck)
