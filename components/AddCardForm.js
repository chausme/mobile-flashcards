import React from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, Picker } from 'react-native'
import { Field, Item, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const required = value => (value ? undefined : 'Required')

const renderInput = ({ input, label, meta: { touched, error, warning }, ...inputProps }) => (
    <View>
    {touched &&
      ((error && <Text>{error}</Text>) ||
        (warning && <Text>{warning}</Text>))}
        <Text>Please enter {label}</Text>
        <TextInput {...input} />
    </View>
)

const renderPicker = ({ input: { onChange, value, ...inputProps }, label, ...pickerProps }) => (
        <View>
            <Text>Please select {label}</Text>
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
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            <Field name="question" component={renderInput} label="question" validate={required} />
            <Field
                name="answer"
                component={renderPicker}
                label="answer"
                value=""
            >
            </Field>
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
            deckTitle: state.deck.deck ? state.deck.deck.title : state.general.lastDeckTitle,
            answer: 'yes'
        }
    }),
)(AddCardForm)

export default AddCardForm
