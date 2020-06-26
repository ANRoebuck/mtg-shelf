import { combineReducers } from 'redux';
import deckBuilder from './deckBuilder-reducer';
import { DECKBUILDER_STATE } from "./deckBuilder-actions";

export default combineReducers({
  [DECKBUILDER_STATE]: deckBuilder,
});
