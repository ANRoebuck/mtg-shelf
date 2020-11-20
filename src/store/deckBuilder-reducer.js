import Immutable from 'seamless-immutable';
import {
  SET_DECKLIST, SET_DECKNAME, SET_SAVE_OR_SAVEAS, SET_SEARCH_OR_DECKS,
} from './deckBuilder-actions';


export const defaultState = Immutable.from({
  decklist: [],
  deckName: '',
  saveOrSaveAs: 'save',
  searchOrDecks: 'search',
});

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_DECKLIST:
      return state.set('decklist', action.decklist);
    case SET_DECKNAME:
      return state.set('deckName', action.deckName);
    case SET_SAVE_OR_SAVEAS:
      return state.set('saveOrSaveAs', action.saveOrSaveAs);
    case SET_SEARCH_OR_DECKS:
      return state.set('searchOrDecks', action.searchOrDecks);
    default:
      return state;
  }
};
