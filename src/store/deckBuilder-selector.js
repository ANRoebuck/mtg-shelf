import { DECKBUILDER_STATE } from "./deckBuilder-actions";


export const selectDeckBuilderState = (store) => store[DECKBUILDER_STATE];

export const selectDeckName = (store) => store[DECKBUILDER_STATE].deckName;

export const selectDecklist = (store) => store[DECKBUILDER_STATE].decklist;

export const selectMaindeck = (store) =>
  store[DECKBUILDER_STATE].decklist.filter(({ ms }) => ms === 'm');
export const selectSideboard = (store) =>
  store[DECKBUILDER_STATE].decklist.filter(({ ms }) => ms === 's');

export const selectSaveOrSaveAs = (store) => store[DECKBUILDER_STATE].saveOrSaveAs;

export const selectSearchOrDecks = (store) => store[DECKBUILDER_STATE].searchOrDecks;
