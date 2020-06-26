import Immutable from 'seamless-immutable';
import {
  SOME_ACTION,
  SET_DECKLIST,
} from './deckBuilder-actions';

export const defaultState = Immutable.from({
  decklist: [],
});

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_DECKLIST:
      return state.set('decklist', action.decklist);
    default:
      return state;
  }
};
