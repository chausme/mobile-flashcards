import React from 'react'
import { StyleSheet, Text, View, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, black, gray } from '../utils/colors'
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
            <View style={styles.generalView}>

            {(currentCard <= cards.length - 1) ? (

                <View>

                    {(this.state.showAnswer) ? (

                        <View style={styles.content}>
                            <Text style={styles.answer}>Answer: {cards[currentCard].answer}</Text>
                            <TouchableOpacity style={styles.buttonSecondary} onPress={() => this.showQuestion()}>
                                <Text style={styles.buttonSecondaryText}>Back to Question</Text>
                            </TouchableOpacity>
                        </View>

                    ) : (

                        <View>
                            <View style={styles.header}>
                                <Text style={styles.cardsQuantity}>{currentCard + 1} / {cards.length}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.question}>{cards[currentCard].question}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.showAnswer} onPress={() => this.showAnswer()}>Show Answer</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.buttonSecondary} onPress={() => this.clickCorrect(cards[currentCard].answer)}>
                                    <Text style={styles.buttonSecondaryText}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonPrimary} onPress={() => this.clickIncorrect(cards[currentCard].answer)}>
                                    <Text style={styles.buttonPrimaryText}>lncorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )}

                </View>

            ) : (

                <View>
                    <View style={styles.content}>
                        <Text style={styles.results}>You answered {this.props.quiz.correct} question(s) correctly of {cards.length} in total, which is {this.props.quiz.correct / cards.length * 100}%</Text>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.buttonSecondary} onPress={() => this.props.startQuiz()}>
                            <Text style={styles.buttonSecondaryText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPrimary} onPress={() => this.props.navigation.navigate(
                          'DeckDetails',
                          { deckTitle: deckTitle }
                        )}>
                            <Text style={styles.buttonPrimaryText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )}

            </View>

        )

    }

}

const styles = StyleSheet.create({
    generalView: {
        backgroundColor: white,
        alignItems: 'center',
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 4,
        justifyContent: 'center'
    },
    cardsQuantity: {
        // color: gray,
        // textAlign: 'center',
        // fontSize: 20
        padding: 20
    },
    question: {
        fontSize: 18
    },
    answer: {
        fontSize: 18,
        marginBottom: 20
    },
    results: {
        fontSize: 18,
    },
    showAnswer: {
        textAlign: 'center',
        marginTop: 20,
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    buttonPrimary: {
        borderColor: black,
        borderWidth: 1,
        backgroundColor: black,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonPrimaryText: {
        color: white,
        fontSize: 18,
    },
    buttonSecondary: {
        borderColor: black,
        borderWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonSecondaryText: {
        fontSize: 18,
    },
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
