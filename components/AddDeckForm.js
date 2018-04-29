import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { red, yellow, white, black } from '../utils/colors'

const required = value => (value ? undefined : 'Required')

const renderInput = ({ input, label, meta: { touched, error, warning }, ...inputProps }) => (
    <View>
    {touched &&
      ((error && <Text style={styles.error}>{error}</Text>) ||
        (warning && <Text style={styles.warning}>{warning}</Text>))}
        <TextInput style={styles.input} {...input} />
    </View>
)

const AddDeckForm = props => {

    const { handleSubmit } = props

    return (
        <View>
            <Field name="deckTitle" component={renderInput} label="Deck Title" validate={required} />
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
                <Text style={styles.buttonPrimaryText}>Create Deck</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    buttonPrimary: {
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
    input: {
        marginBottom: 10,
        fontSize: 18,
        paddingBottom: 10
    },
    error: {
        textAlign: 'center',
        color: red
    },
    warning: {
        textAlign: 'center',
        color: yellow
    }
})

AddDeckForm = reduxForm({
    form: 'addDeck'
})(AddDeckForm)

export default AddDeckForm
