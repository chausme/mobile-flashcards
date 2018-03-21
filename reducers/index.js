import { combineReducers } from 'redux'
import {
    FETCH_DECKS,
    FETCH_DECK
} from '../actions'

function decks (state = {}, action) {

  const { decks } = action

  switch (action.type) {
    case FETCH_DECKS :
      return decks ? decks : state
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
    deck
})
