import React from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import {
    fetchDeck,
    startQuizAction,
    nextCardAction
} from '../actions'

class Quiz extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        }
    }

    componentDidMount() {
        this.props.startQuiz()
        this.props.fetchDeck(this.props.navigation.state.params.deckTitle)
    }

    render() {

        const deckTitle = this.props.navigation.state.params.deckTitle
        const deck = this.props.deck

        const cards = deck.questions
        const currentCard = this.props.quiz.current

        return (
            <View style={styles.question}>
                <Text>{cards[currentCard].question}</Text>
                <TouchableOpacity>
                    <Text>Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nextCard()}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.nextCard()}>
                    <Text>lncorrect</Text>
                </TouchableOpacity>
            </View>
        )

    }

}

const styles = StyleSheet.create({
    question: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answer: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

function mapStateToProps ({deck, quiz}) {
    return {
        deck: deck.deck,
        quiz: quiz
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    return {
        fetchDeck: (data) => dispatch(fetchDeck(data)),
        startQuiz: () => dispatch(startQuizAction()),
        nextCard: () => dispatch(nextCardAction()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Quiz)
