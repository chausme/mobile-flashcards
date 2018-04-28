import React from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Field, reduxForm } from 'redux-form'

const required = value => (value ? undefined : 'Required')

const renderInput = ({ input, label, meta: { touched, error, warning }, ...inputProps }) => (
    <View>
    {touched &&
      ((error && <Text>{error}</Text>) ||
        (warning && <Text>{warning}</Text>))}
        <TextInput {...input} />
    </View>
)

const AddDeckForm = props => {

    const { handleSubmit } = props

    return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <Field name="deckTitle" component={renderInput} label="Deck Title" validate={required} />
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
