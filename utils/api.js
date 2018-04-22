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

    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, result, () => {
            AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
        })
    }).then(response => (deckTitle))

}

export const addCardToDeck = (card) => {

    console.log('api card')
    console.log(card)

    let newCard = {
        question: card.question,
        answer: card.answer
    }

    function setStorage() {
        return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
            console.log('new card')
            console.log(newCard)

            let mergedData = JSON.parse(result)
            console.log('mergedData')
            mergedData[card.deckTitle].questions = mergedData[card.deckTitle].questions.concat(newCard);
            console.log(mergedData)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(mergedData), (err, result) => {
                console.log('resolve')
                console.log(result)
            })
        })
    }

    function getUpdatedStorage() {
        return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
            console.log('get updated storage')
            console.log(result)
        })
    }

    async function waitForSet() {
        const set = await setStorage()
        return await getUpdatedStorage()
    }

    return waitForSet().then(result => {

        console.log('waitfor')
        console.log(result)

        return card
    })

}
