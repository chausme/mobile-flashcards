import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Picker } from 'react-native'
import { Field, Item, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { red, yellow, white, black } from '../utils/colors'

const required = value => (value ? undefined : 'Required')

const renderInput = ({ input, label, meta: { touched, error, warning }, ...inputProps }) => (
    <View style={styles.inputListItem}>
    {touched &&
      ((error && <Text style={styles.error}>{error}</Text>) ||
        (warning && <Text style={styles.warning}>{warning}</Text>))}
        <Text style={styles.label}>Please enter {label}</Text>
        <TextInput style={styles.input} {...input} />
    </View>
)

const renderPicker = ({ input: { onChange, value, ...inputProps }, label, ...pickerProps }) => (
        <View style={styles.inputListItem}>
            <Text style={styles.label}>Please select {label}</Text>
            <Picker
                selectedValue={value}
                onValueChange={value => {
                    requestAnimationFrame(() => {
                        onChange(value);
                    });
                }}
                {...inputProps}
                {...pickerProps}
            >
                <Picker.Item label="Yes" value="yes" />
                <Picker.Item label="No" value="no" />
            </Picker>
        </View>

);

const AddCardForm = props => {

    const { handleSubmit } = props

    return (
        <View>
            <Field name="question" component={renderInput} label="question" validate={required} />
            <Field
                name="answer"
                component={renderPicker}
                label="answer"
                value=""
            >
            </Field>
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
                <Text style={styles.buttonPrimaryText}>Submit</Text>
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
    },
    label: {
        fontSize: 18,
        marginBottom: 10
    },
    inputListItem: {
        marginBottom: 20
    }
})

AddCardForm = reduxForm({
    form: 'addCard',
    enableReinitialize: true
})(AddCardForm)

AddCardForm = connect(
    state => ({
        initialValues: {
            deckTitle: state.deck.deck ? state.deck.deck.title : state.general.lastDeckTitle,
            answer: 'yes'
        }
    }),
)(AddCardForm)

export default AddCardForm
