import React from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const renderInput = ({ input, ...inputProps }) => (
    <TextInput {...input} />
)

const AddCardForm = props => {

    const { handleSubmit } = props

    return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <Field name="question" component={renderInput} label="Question" />
            <Field name="answer" component={renderInput} label="Answer" />
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    )

}

AddCardForm = reduxForm({
    form: 'addCard',
    enableReinitialize: true
})(AddCardForm)

AddCardForm = connect(
    state => ({
        initialValues: {
            deckTitle: state.deck.deck ? state.deck.deck.title : state.general.lastDeckTitle
        }
    }),
)(AddCardForm)

export default AddCardForm
