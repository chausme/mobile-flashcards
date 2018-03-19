import { AsyncStorage } from 'react-native'
import { formatDecksResults, DECKS_STORAGE_KEY } from './_decks'

export function fetchDecksResults() {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDecksResults)
}
