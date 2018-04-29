import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
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

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    flipCard() {

        if (this.value >= 90) {

            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();

            } else {

            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
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

        const frontAnimatedStyle = {
          transform: [
            { rotateY: this.frontInterpolate }
          ]
        }
        const backAnimatedStyle = {
          transform: [
            { rotateY: this.backInterpolate }
          ]
        }

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
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                        <View style={styles.content}>
                            <Text style={styles.answer}>Answer: {cards[currentCard].answer}</Text>
                            <TouchableOpacity onPress={() => this.flipCard()}>
                                <Text style={styles.showAnswer}>Back to Question</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                        <View style={styles.header}>
                            <Text style={styles.cardsQuantity}>{currentCard + 1} / {cards.length}</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.question}>{cards[currentCard].question}</Text>
                            <TouchableOpacity onPress={() => this.flipCard()}>
                                <Text style={styles.showAnswer}>Show Answer</Text>
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
                    </Animated.View>
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
        padding: 20
    },
    question: {
        fontSize: 18
    },
    answer: {
        fontSize: 18,
        marginBottom: 20,
        paddingTop: 140,
        textAlign: 'center'
    },
    results: {
        fontSize: 18,
    },
    showAnswer: {
        textAlign: 'center',
        marginTop: 20,
        padding: 20,
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
    flipCard: {
      backfaceVisibility: 'hidden',
    },
    flipCardBack: {
      position: "absolute",
      top: 0,
      width: 400,
      height: 400
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
