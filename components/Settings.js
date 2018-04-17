import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import {
    removeDecks,
    fetchDecks
} from '../actions'

class Settings extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings'
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {

            this.props.fetchDecks()
            console.log('fetch it!')

        }
    }

    render() {

        const { removeDecks } = this.props

        return (
            <View style={styles.addCard}>
                <TouchableOpacity onPress={() => removeDecks()}>
                    <Text>Remove all decks</Text>
                </TouchableOpacity>
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

function mapStateToProps () {

    return {}

}

function mapDispatchToProps (dispatch) {
    return {
        removeDecks: (data) => dispatch(removeDecks(data)),
        fetchDecks: () => dispatch(fetchDecks())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)
