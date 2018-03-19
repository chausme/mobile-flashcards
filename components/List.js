import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
//import { fetchDecks } from '../utils/api'
import {
  fetchDecks
} from '../actions'

class List extends React.Component {

    componentDidMount() {

      this.props.fetchDecks()

    }

    render() {

        let decks = this.props.decks

        return (
            <View style={styles.deckList}>
                {decks.map((deck) => (
                  <Text key={deck.title}>
                    {deck.title}
                  </Text>
                ))}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    deckList: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps ({decks}) {

    return {
        decks: Object.values(decks),
    }

}

function mapDispatchToProps (dispatch) {
    return {
        fetchDecks: () => dispatch(fetchDecks()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)
