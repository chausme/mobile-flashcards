import React from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Field, reduxForm } from 'redux-form'

const renderInput = ({ input, ...inputProps }) => (
    <TextInput {...input} />
)

const AddDeckForm = props => {

    const { handleSubmit } = props

    return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <Field name="deckTitle" component={renderInput} label="Deck Title" />
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Create Deck</Text>
            </TouchableOpacity>
        </ScrollView>
    )

}

AddDeckForm = reduxForm({
    form: 'addDeck'
})(AddDeckForm)

export default AddDeckForm
