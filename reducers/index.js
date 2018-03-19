import { combineReducers } from 'redux'
import {
    FETCH_DECKS
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

export default combineReducers({
  decks
})
