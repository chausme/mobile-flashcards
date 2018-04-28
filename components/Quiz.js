import React from 'react'
import { StyleSheet, Text, View, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/helpers'
import {
    fetchDeck,
    startQuizAction,
    nextCardAction
} from '../actions'

class Quiz extends React.Component {

    state = {
        showAnswer: false,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        }
    }

    componentDidMount() {
        this.props.startQuiz()
        this.props.fetchDeck(this.props.navigation.state.params.deckTitle)
    }

    clickCorrect(answer) {

        let correct = 0;

        if (answer.toLowerCase() === 'yes') {
            correct = 1
        }

        this.props.nextCard(correct)

    }

    clickIncorrect(answer) {

        let correct = 0;

        if (answer.toLowerCase() === 'no') {
            correct = 1
        }

        this.props.nextCard(correct)

    }

    showAnswer() {
        this.setState(() => ({showAnswer: true}))
    }

    showQuestion() {
        this.setState(() => ({showAnswer: false}))
    }

    render() {

        const deckTitle = this.props.navigation.state.params.deckTitle
        const deck = this.props.deck

        const nextCard = this.props.nextCard

        const cards = deck.questions
        const currentCard = this.props.quiz.current

        if (currentCard > cards.length - 1) {

            clearLocalNotification()
                .then(setLocalNotification)

        }

        return (
            <View style={styles.question}>

            {(currentCard <= cards.length - 1) ? (

                <View>

                    {(this.state.showAnswer) ? (

                        <View>
                            <Text>Answer: {cards[currentCard].answer}</Text>
                            <TouchableOpacity onPress={() => this.showQuestion()}>
                                <Text>Back to Question</Text>
                            </TouchableOpacity>
                        </View>

                    ) : (

                        <View>
                            <View>
                                <Text>Deck title: {deckTitle}</Text>
                                <Text>{currentCard} / {cards.length}</Text>
                            </View>
                            <View>
                                <Text>{cards[currentCard].question}</Text>
                                <TouchableOpacity>
                                    <Text onPress={() => this.showAnswer()}>Show Answer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.clickCorrect(cards[currentCard].answer)}>
                                    <Text>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.clickIncorrect(cards[currentCard].answer)}>
                                    <Text>lncorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )}

                </View>

            ) : (

                <View>
                    <Text>You answered {this.props.quiz.correct} questions correctly of {cards.length} in total, which is {this.props.quiz.correct / cards.length * 100}%</Text>
                    <TouchableOpacity onPress={() => this.props.startQuiz()}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(
                      'DeckDetails',
                      { deckTitle: deckTitle }
                    )}>
                        <Text>Back to Deck</Text>
                    </TouchableOpacity>
                </View>

            )}

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
        nextCard: (data) => dispatch(nextCardAction(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Quiz)
