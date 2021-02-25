export const getSavedDecks = () => getSavedDecksFromLocalStorage();

export const addSavedDeck = (newDeckName, newDeck) => {
  const deckToAdd = { name: newDeckName, deck: newDeck };
  const decklists = getSavedDecks();
  let updatedDecklists;
  if ((decklists.filter(decklist => decklist.name === newDeckName)).length === 0) {
    updatedDecklists = decklists.concat([deckToAdd]);
  } else {
    updatedDecklists = decklists.map(decklist => decklist.name === newDeckName ? deckToAdd : decklist);
  }
  setDecklistsInLocalStorage(updatedDecklists);
}

export const deleteSavedDeck = (deckNameToDelete) => {
  const updatedDecklists = getSavedDecks().filter(deck => deck.name !== deckNameToDelete);
  setDecklistsInLocalStorage(updatedDecklists);
}

export const clearAllSavedDecksFromLocalStorage = () => setDecklistsInLocalStorage([]);

const getSavedDecksFromLocalStorage = () => JSON.parse(localStorage.getItem('savedDecks')) || [];

const setDecklistsInLocalStorage = (decklists) => localStorage.setItem('savedDecks', JSON.stringify(decklists));