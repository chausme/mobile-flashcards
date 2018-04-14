import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
//import AddDeckForm from './AddDeckForm'
import { NavigationActions } from 'react-navigation'
import {
    addDeck
} from '../actions'

class AddCard extends React.Component {

    render() {

        const { addDeck } = this.props

        return (
            <View style={styles.addCard}>
                <Text>Form will be here!</Text>
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
)(AddCard)
