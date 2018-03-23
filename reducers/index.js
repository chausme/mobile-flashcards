import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
    FETCH_DECKS,
    FETCH_DECK,
    ADD_DECK
} from '../actions'

function decks (state = {}, action) {

    const { decks, deckTitle } = action

    switch (action.type) {
        case FETCH_DECKS :
            return decks ? decks : state
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

    const { deck } = action

    switch (action.type) {
        case FETCH_DECK :
            return {
                ...state,
                deck: deck
            }
        default :
            return state
        }
}

export default combineReducers({
    decks,
    deck,
    form: formReducer
})
