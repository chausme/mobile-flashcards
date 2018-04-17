import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
    FETCH_DECKS,
    FETCH_DECK,
    REMOVE_DECKS,
    ADD_DECK,
    ADD_CARD
} from '../actions'

function general (state = {redirect: false, lastDeckTitle: false, lastDeckCards: 0}, action) {

    const { deckTitle } = action

    switch (action.type) {
        case FETCH_DECKS :
            return {
                ...state,
                redirect: false
            }
        case FETCH_DECK :
            return {
                ...state,
                redirect: false
            }
        case REMOVE_DECKS :
            return {}
        case ADD_DECK :
            return {
                ...state,
                redirect: deckTitle,
                lastDeckTitle: deckTitle
            }
        case ADD_CARD :
            return {
                ...state,
                redirect: true,
                lastDeckTitle: false,
                lastDeckCards: state.lastDeckCards + 1
            }
        default :
            return state
  }

}

function decks (state = {}, action) {

    const { decks, deckTitle } = action

    switch (action.type) {
        case FETCH_DECKS :
            return decks ? decks : state
        case REMOVE_DECKS :
            return {}
        case ADD_DECK :
            return {
                ...state,
                [deckTitle]: {
                     title: deckTitle,
                     questions: []
                }
            }
        default :
            return state
  }
}

function deck (state = {}, action) {

    const { deck, deckTitle } = action

    switch (action.type) {
        case FETCH_DECK :
            return {
                ...state,
                deck: deck
            }
        case REMOVE_DECKS :
            return {}
        default :
            return state
        }
}

export default combineReducers({
    general,
    decks,
    deck,
    form: formReducer
})
