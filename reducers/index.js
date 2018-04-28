import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
    FETCH_DECKS,
    FETCH_DECK,
    DISABLE_REDIRECT,
    REMOVE_DECKS,
    ADD_DECK,
    ADD_CARD,
    START_QUIZ,
    NEXT_CARD
} from '../actions'

function general (state = {redirect: false}, action) {

    const { deckTitle } = action

    switch (action.type) {
        case FETCH_DECKS :
            return {
                ...state,
                redirect: false
            }
        case DISABLE_REDIRECT :
            return {
                ...state,
                redirect: false
            }
        case REMOVE_DECKS :
            return {}
        case ADD_DECK :
            return {
                ...state,
                redirect: deckTitle
            }
        case ADD_CARD :
            return {
                ...state,
                redirect: deckTitle
            }
        default :
            return state
  }

}

function decks (state = {}, action) {

    const { decks, deckTitle, card } = action

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
        case ADD_CARD :
            return {
                ...state,
                [deckTitle]: {
                    ...state[deckTitle],
                    questions: state[deckTitle].questions.concat(card)
                }
            }
        default :
            return state
  }
}

function deck (state = {}, action) {

    const { deck, deckTitle, card } = action

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

function quiz (state = {current: 0}, action) {

    const { card } = action

    switch (action.type) {
        case START_QUIZ :
            return {
                ...state,
                current: 0
            }
        case NEXT_CARD :
            return {
                ...state,
                current: state.current + 1
            }
        default :
            return state
        }
}

export default combineReducers({
    general,
    decks,
    deck,
    quiz,
    form: formReducer
})
