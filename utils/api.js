import { AsyncStorage } from 'react-native'
import { formatDecksResults, DECKS_STORAGE_KEY } from './_decks'

export const fetchDecks = () => {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDecksResults)

}

export const fetchDeck = (deckTitle) => {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(results => JSON.parse(results)[deckTitle])

}
