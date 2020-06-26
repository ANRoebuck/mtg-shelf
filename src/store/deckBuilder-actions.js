
export const DECKBUILDER_STATE = 'deckbuilder';
export const SET_DECKLIST = `${DECKBUILDER_STATE}/SET_DECKLIST`;


export const setDecklist = (decklist) => (dispatch) => {
  dispatch({
    type: SET_DECKLIST,
    decklist
  });
};

export const addCardToMain = (card) => addCard(card, 'm');
export const addCardToSide = (card) => addCard(card, 's');
const addCard = (card, ms) => (dispatch, getState) => {
  const { decklist } = getState()[DECKBUILDER_STATE];
  const updatedDecklist = [ ...decklist, { ...card, ms, index: decklist.length}];
  dispatch({
    type: SET_DECKLIST,
    decklist: updatedDecklist
  })
};

export const removeCard = (cardToRemove) => (dispatch, getState) => {
  const { decklist } = getState()[DECKBUILDER_STATE];
  const updatedDecklist = [ ...decklist.filter(card => card !== cardToRemove)];
  dispatch({
    type: SET_DECKLIST,
    decklist: updatedDecklist
  })
};

export const sideOut = (card) => {
  removeCard(card);
  addCardToSide(card);
};
export const sideIn = (card) => {
  removeCard(card);
  addCardToMain(card);
};