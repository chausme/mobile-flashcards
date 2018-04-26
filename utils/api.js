import { AsyncStorage } from 'react-native'
import { formatDecksResults, DECKS_STORAGE_KEY } from './_decks'

export const fetchDecks = () => {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDecksResults)
}

export const fetchDeck = (deckTitle) => {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(results => {
            return results !== null ? JSON.parse(results)[deckTitle] : ''
        })
}

export const removeDecks = () => {
    return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}

export const addDeck = (deckTitle) => {

    let newDeck = {
        [deckTitle]: {
            title: deckTitle,
            questions: []
        }
    }

    function setStorage() {
        return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
            AsyncStorage.setItem(DECKS_STORAGE_KEY, result, () => {
                AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
            })
        })
    }

    function getUpdatedStorage() {
        return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    }

    async function waitForSet() {
        const set = await setStorage()
        return await getUpdatedStorage()
    }

    return waitForSet().then(result => {
        return deckTitle
    })

}

export const addCardToDeck = (card) => {

    let newCard = {
        question: card.question,
        answer: card.answer
    }

    function setStorage() {
        return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {

            let mergedData = JSON.parse(result)
            mergedData[card.deckTitle].questions = mergedData[card.deckTitle].questions.concat(newCard);

            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(mergedData))
        })
    }

    function getUpdatedStorage() {
        return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    }

    async function waitForSet() {
        const set = await setStorage()
        return await getUpdatedStorage()
    }

    return waitForSet().then(result => {
        return card
    })

}
