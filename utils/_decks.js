// Utilities for backfilling decks.

import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

function setDummyData () {

    let dummyData = {
            React: {
                title: 'React',
                    questions: [
                        {
                            question: 'Is React a library for managing user interfaces?',
                            answer: 'Yes'
                        },
                        {
                            question: 'Is componentWillMount lifecycle event good to make Ajax requests in React?',
                            answer: 'No'
                        }
                    ]
            },
            JavaScript: {
                title: 'JavaScript',
                    questions: [
                        {
                            question: 'Is it correct definition of closure - combination of a function and the lexical environment within which that function was declared?',
                            answer: 'Yes'
                        }
                    ]
            }
    }

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData

}

export function formatDecksResults (results) {

    return results === null
        ? setDummyData()
        : JSON.parse(results)

}
