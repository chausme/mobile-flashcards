import React from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableOpacity } from 'react-native';
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
        this.props.fetchDeck(this.props.navigation.state.params.deckTitle)
                console.log('this.props')
        console.log(this.props)
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {

            if (this.props.general.lastDeckTitle) {

                console.log('update questions!')

            }
        }
    }

    render() {

        Keyboard.dismiss()

        const deckTitle = this.props.navigation.state.params.deckTitle
        const deck = this.props.deck

        console.log('single deck')
        console.log(this.props)

        return (
            <View style={styles.deckDetails}>
                <Text>Deck Details for {this.props.navigation.state.params.deckTitle}</Text>
                <Text>
                    { deck
                        ? deck.questions.length
                        : ( this.props.general.lastDeckCards
                            ? this.props.general.lastDeckCards
                            : '0'
                        )
                    }
                    cards
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeckDetails)
