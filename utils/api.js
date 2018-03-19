import { AsyncStorage } from 'react-native'
import { formatDecksResults, DECKS_STORAGE_KEY } from './_decks'

export const fetchDecks = () => {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDecksResults)

}
