import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native'
import AddDeckForm from './AddDeckForm'
import { NavigationActions } from 'react-navigation'
import { white } from '../utils/colors'
import {
    addDeck
} from '../actions'

class AddDeck extends React.Component {

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {
            if (this.props.general.redirect) {

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
            <KeyboardAvoidingView style={styles.generalView} behavior="padding" enabled>
                <View style={styles.formWrap}>
                    <Text style={styles.label}>What is the title of your new deck?</Text>
                    <AddDeckForm onSubmit={addDeck} />
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    generalView: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    formWrap: {
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10
    },
})

function mapStateToProps ({decks, general}) {

    return {
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
