import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import AddCardForm from './AddCardForm'
import { NavigationActions } from 'react-navigation'
import { white } from '../utils/colors'

import {
    addCard
} from '../actions'

class AddCard extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card'
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {

            if (this.props.general.redirect) {

                this.props.navigation.navigate({
                    routeName: 'DeckDetails',
                    params: {deckTitle: this.props.general.redirect},
                })

            }
        }
    }

    render() {

        const { addCard } = this.props

        return (
            <KeyboardAvoidingView style={styles.generalView} behavior="padding" enabled>
                <View style={styles.formWrap}>
                    <AddCardForm onSubmit={addCard} />
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
})

function mapStateToProps ({decks, general}) {

    return {
        decks: decks,
        general: general
    }

}

function mapDispatchToProps (dispatch) {
    return {
        addCard: (data) => dispatch(addCard(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCard)
