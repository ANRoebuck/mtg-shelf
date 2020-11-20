import { combineReducers } from 'redux';
import app from './app-reducer';
import deckBuilder from './deckBuilder-reducer';
import { APP_STATE } from "./app-actions";
import { DECKBUILDER_STATE } from "./deckBuilder-actions";

export default combineReducers({
  [APP_STATE]: app,
  [DECKBUILDER_STATE]: deckBuilder,
});
