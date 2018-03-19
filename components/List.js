import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { fetchDecksResults } from '../utils/api'

export default class List extends React.Component {

    componentDidMount() {

      fetchDecksResults()

    }

    render() {

      return (
        <View style={styles.deckList}>
          <Text>
            Welcome to React Native!
          </Text>
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
