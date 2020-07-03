
export const DECKBUILDER_STATE = 'deckbuilder';
export const SET_DECKLIST = `${DECKBUILDER_STATE}/SET_DECKLIST`;


export const setDecklist = (decklist) => (dispatch) => {
  dispatch({
    type: SET_DECKLIST,
    decklist
  });
};

export const addCardToMain = (card) => (dispatch) => dispatch(addCard(card, 'm'));
export const addCardToSide = (card) => (dispatch) => dispatch(addCard(card, 's'));
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
  const updatedDecklist = decklist.filter(card => card !== cardToRemove);
  dispatch({
    type: SET_DECKLIST,
    decklist: updatedDecklist
  })
};
export const removeAllByNameAndZone = (cardToRemove) => (dispatch, getState) => {
  const { decklist } = getState()[DECKBUILDER_STATE];
  const updatedDecklist = decklist.filter(({ name, ms }) => name !== cardToRemove.name || ms !== cardToRemove.ms);
  dispatch({
    type: SET_DECKLIST,
    decklist: updatedDecklist
  })
}

export const sideOut = (card) => (dispatch) => {
  dispatch(removeCard(card));
  dispatch(addCardToSide(card));
};
export const sideIn = (card) => (dispatch) => {
  dispatch(removeCard(card));
  dispatch(addCardToMain(card));
};


export const incrementToX = (cardToIncrement, targetQuantity) => (dispatch, getState) => {
  const { decklist } = getState()[DECKBUILDER_STATE];
  const current = currentQuantity(cardToIncrement, decklist);

  for(let i = 0; i < targetQuantity - current; i++) {
    dispatch(addCardToMain(cardToIncrement));
  }
}

const currentQuantity = (card, decklist) => decklist.filter((c) => c.name === card.name).length;
