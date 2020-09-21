export const DECKBUILDER_STATE = 'deckbuilder';
export const SET_DECKLIST = `${DECKBUILDER_STATE}/SET_DECKLIST`;
export const SET_DECKNAME = `${DECKBUILDER_STATE}/SET_DECKNAME`;
export const SET_SAVE_OR_SAVEAS = `${DECKBUILDER_STATE}/SET_SAVE_OR_SAVEAS`;
export const SET_SEARCH_OR_DECKS = `${DECKBUILDER_STATE}/SET_SEARCH_OR_DECKS`;


export const loadDeck = (savedDeck) => (dispatch) => {
  const {name, deck} = savedDeck;
  dispatch(setDecklist(deck));
  dispatch(setDeckName(name));
};

export const setDecklist = (decklist) => (dispatch) => {
  dispatch({
    type: SET_DECKLIST,
    decklist
  });
};

export const setDeckName = (deckName) => (dispatch) => {
  dispatch({
    type: SET_DECKNAME,
    deckName
  })
};

export const toggleSaveOrSaveAs = () => (dispatch, getState) =>
  dispatch(setSaveOrSaveAs(getState()[DECKBUILDER_STATE].saveOrSaveAs === 'save' ? 'saveAs' : 'save'));
const setSaveOrSaveAs = (saveOrSaveAs) => (dispatch) => {
  dispatch({
    type: SET_SAVE_OR_SAVEAS,
    saveOrSaveAs
  })
};

export const toggleSearchOrDecks = () => (dispatch, getState) =>
  dispatch(setSearchOrDecks(getState()[DECKBUILDER_STATE].searchOrDecks === 'search' ? 'decks' : 'search'));
const setSearchOrDecks = (searchOrDecks) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_OR_DECKS,
    searchOrDecks
  })
}

export const addCardToMain = (card) => (dispatch) => dispatch(addCard(card, 'm'));
export const addCardToSide = (card) => (dispatch) => dispatch(addCard(card, 's'));
const addCard = (card, ms) => (dispatch, getState) => {
  const {decklist} = getState()[DECKBUILDER_STATE];
  const updatedDecklist = [...decklist, {...card, ms, index: decklist.length}];
  dispatch({
    type: SET_DECKLIST,
    decklist: updatedDecklist
  })
};

export const removeCard = (cardToRemove) => (dispatch, getState) => {
  const {decklist} = getState()[DECKBUILDER_STATE];
  const updatedDecklist = decklist.filter(card => card !== cardToRemove);
  dispatch({
    type: SET_DECKLIST,
    decklist: updatedDecklist
  })
};
export const removeAllByNameAndZone = (cardToRemove) => (dispatch, getState) => {
  const {decklist} = getState()[DECKBUILDER_STATE];
  const updatedDecklist = decklist.filter(({name, ms}) => name !== cardToRemove.name || ms !== cardToRemove.ms);
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

export const incrementMaindeckToX = (cardToIncrement, targetQuantity) => (dispatch, getState) => {
  const {decklist} = getState()[DECKBUILDER_STATE];
  const current = currentQuantity(cardToIncrement, decklist);

  for (let i = 0; i < targetQuantity - current; i++) {
    dispatch(addCardToMain(cardToIncrement));
  }
}

export const addSomeToSomewhere = (cardToAdd, some, somewhere) => (dispatch) => {
  switch (somewhere) {
    case 'main' :
      return dispatch(addSomeToMain(cardToAdd, some));
    case 'side' :
      return dispatch(addSomeToSide(cardToAdd, some));
    default:
      return null;
  }
};

export const where = (i) => {
  switch (i) {
    case 0:
      return 'main';
    case 1:
      return 'side';
    default:
      return null;
  }
};
export const addSomeToMain = (cardToAdd, some) => (dispatch) => {
  for (let i = 0; i < some; i++) {
    dispatch(addCardToMain(cardToAdd));
  }
};

export const addSomeToSide = (cardToAdd, some) => (dispatch) => {
  for (let i = 0; i < some; i++) {
    dispatch(addCardToSide(cardToAdd));
  }
}

const currentQuantity = (card, decklist) => decklist.filter((c) => c.name === card.name).length;
