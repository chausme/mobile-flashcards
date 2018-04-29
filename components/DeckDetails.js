import React from 'react'
import { StyleSheet, Text, View, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, black, gray } from '../utils/colors'
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
            <View style={styles.generalView}>
                <View style={styles.content}>
                    <Text style={styles.deckTitle}>{this.props.navigation.state.params.deckTitle}</Text>
                    <Text style={styles.cardsQuantity}>{deck ? deck.questions.length : '0'} cards</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.buttonSecondary} onPress={() => this.props.navigation.navigate(
                      'AddCard',
                      { deckTitle: deckTitle }
                    )}>
                        <Text style={styles.buttonSecondaryText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPrimary} onPress={() => this.props.navigation.navigate(
                      'Quiz',
                      { deckTitle: deckTitle }
                    )}>
                        <Text style={styles.buttonPrimaryText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }

}

const styles = StyleSheet.create({
    generalView: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
    },
    content: {
        flex: 2,
        justifyContent: 'center'
    },
    deckTitle: {
        fontSize: 30,
        textAlign: 'center'
    },
    cardsQuantity: {
        color: gray,
        textAlign: 'center',
        fontSize: 20
    },
    actions: {
        flex: 1
    },
    buttonPrimary: {
        borderColor: black,
        borderWidth: 1,
        backgroundColor: black,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: 'center',
        borderRadius: 10
    },
    buttonPrimaryText: {
        color: white,
        fontSize: 18,
    },
    buttonSecondary: {
        borderColor: black,
        borderWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonSecondaryText: {
        fontSize: 18,
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
