import * as Api from '../utils/api'

export const FETCH_DECKS = 'FETCH_DECKS'

export const fetchDecksAction = decks => ({
    type: FETCH_DECKS,
    decks
})

export const fetchDecks = () => dispatch => (
    Api.fetchDecks()
        .then(response => {
            return dispatch(fetchDecksAction(response))
        })
)

export const FETCH_DECK = 'FETCH_DECK'

export const fetchDeckAction = deck => ({
    type: FETCH_DECK,
    deck
})

export const fetchDeck = (deckTitle) => dispatch => {

    return Api.fetchDeck(deckTitle)
        .then(deck => {
            return dispatch(fetchDeckAction(deck))
        })

}

export const DISABLE_REDIRECT = 'DISABLE_REDIRECT'

export const disableRedirectAction = () => ({
    type: DISABLE_REDIRECT
})

export const REMOVE_DECKS = 'REMOVE_DECKS'

export const removeDecksAction = () => ({
    type: REMOVE_DECKS
})

export const removeDecks = () => dispatch => {

    return Api.removeDecks()
        .then(response => {
            return dispatch(removeDecksAction())
        })

}

export const ADD_DECK = 'ADD_DECK'

export const addDeckAction = deckTitle => ({
    type: ADD_DECK,
    deckTitle
})

export const addDeck = (deck) => dispatch => {

    return Api.addDeck(deck.deckTitle)
        .then(response => {
            return dispatch(addDeckAction(response))
        })

}

export const ADD_CARD = 'ADD_CARD'

export const addCardAction = ({card, deckTitle}) => ({
    type: ADD_CARD,
    card,
    deckTitle
})

export const addCard = (card) => dispatch => {

    return Api.addCardToDeck(card)
        .then(response => {
            let card = {
                question: response.question,
                answer: response.answer
            }
            let deckTitle = response.deckTitle
            return dispatch(addCardAction({card, deckTitle}))
        })

}

export const START_QUIZ = 'START_QUIZ'

export const startQuizAction = () => ({
    type: START_QUIZ
})

export const NEXT_CARD = 'NEXT_CARD'

export const nextCardAction = (correct) => ({
    type: NEXT_CARD,
    correct
})
