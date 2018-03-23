import React from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Field, reduxForm } from 'redux-form'

//const required = value => value ? undefined : 'Required'

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
  // a unique name for the form
  form: 'addDeck'
})(AddDeckForm)

export default AddDeckForm
