import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import AddCardForm from './AddCardForm'
import { NavigationActions } from 'react-navigation'
import {
    addCard,
    fetchDeck
} from '../actions'

class AddCard extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card'
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {

            console.log('props add card // deck')
            console.log(this.props.deck.deck)

            if (this.props.general.redirect) {

                console.log('redirect')

                this.props.navigation.dispatch(NavigationActions.navigate({
                    routeName: 'DeckDetails',
                    params: {deckTitle: this.props.general.redirect},
                }))

            }
        }
    }

    render() {

        const { addCard } = this.props

        return (
            <View style={styles.addCard}>
                <AddCardForm onSubmit={addCard} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    addCard: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function mapStateToProps ({decks, deck, general}) {

    return {
        decks: decks,
        deck: deck,
        general: general
    }

}

function mapDispatchToProps (dispatch) {
    return {
        addCard: (data) => dispatch(addCard(data)),
        fetchDeck: (data) => dispatch(fetchDeck(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCard)
