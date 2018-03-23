import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button } from 'react-native'
import AddDeckForm from './AddDeckForm'
import {
    addDeck
} from '../actions'

class AddDeck extends React.Component {

    render() {

        const { addDeck } = this.props

        return (
            <View style={styles.addDeck}>
                <Text>What is the title of your new deck?</Text>
                <AddDeckForm onSubmit={addDeck} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    addDeck: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function mapStateToProps ({post, comments}) {
    return {}
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
