import { DECKBUILDER_STATE } from "./deckBuilder-actions";

export const selectDeckBuilderState = (store) => store[DECKBUILDER_STATE];

export const selectDecklist = (store) => store[DECKBUILDER_STATE].decklist;

export const selectMaindeck = (store) =>
  store[DECKBUILDER_STATE].decklist.filter(({ ms }) => ms === 'm');
export const selectSideboard = (store) =>
  store[DECKBUILDER_STATE].decklist.filter(({ ms }) => ms === 's');