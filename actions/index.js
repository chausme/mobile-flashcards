import * as Api from '../utils/api'

export const FETCH_DECKS = 'FETCH_DECKS'

export const fetchDecksAction = decks => ({
  type: FETCH_DECKS,
  decks
});

export const fetchDecks = () => dispatch => (
    Api.fetchDecks()
        .then(response => {
            return dispatch(fetchDecksAction(response))
        })
);
