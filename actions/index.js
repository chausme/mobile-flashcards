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

export const fetchDeck = (deckTitle) => dispatch => (
    Api.fetchDeck(deckTitle)
        .then(deck => {
            return dispatch(fetchDeckAction(deck))
        })

)

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

export const addDeck = (deck) => dispatch => (
    Api.addDeck(deck.deckTitle)
        .then(response => {
            return dispatch(addDeckAction(response))
        })
)

export const ADD_CARD = 'ADD_CARD'

export const addCardAction = ({card, deckTitle}) => ({
    type: ADD_CARD,
    card,
    deckTitle
})

export const addCard = (card) => dispatch => {

    console.log('card')
    console.log(card)

    return dispatch(addCardAction(card))

    // Api.addCardToDeck({card, deckTitle})
    //     .then(response => {
    //         console.log(response)
    //         //return dispatch(addDeckAction(response))
    //     }))

}
