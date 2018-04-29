import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { black, white } from '../utils/colors'
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
        }
    }

    render() {

        const { removeDecks } = this.props

        return (
            <View style={styles.generalView}>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => removeDecks()}>
                    <Text style={styles.buttonPrimaryText}>Remove all decks</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    generalView: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
