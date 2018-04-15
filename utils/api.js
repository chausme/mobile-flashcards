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

export const addDeck = (deckTitle) => {

    let newDeck = {
        [deckTitle]: {
            title: deckTitle,
            questions: []
        }
    }

    // uncomment below to clear AsyncStorage
    //return AsyncStorage.removeItem(DECKS_STORAGE_KEY)

    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, result, () => {
          AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
      })
  }).then(response => (deckTitle))

}

export const addCardToDeck = ({card, deckTitle}) => {

    return deckTitle

    // let newCard = {
    //     [deckTitle]: {
    //         title: deckTitle,
    //         questions: []
    //     }
    // }

    // uncomment below to clear AsyncStorage
    //return AsyncStorage.removeItem(DECKS_STORAGE_KEY)

  //   return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
  //       AsyncStorage.setItem(DECKS_STORAGE_KEY, result, () => {
  //         AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
  //     })
  // }).then(response => (deckTitle))



}
