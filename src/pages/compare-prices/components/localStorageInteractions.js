
const SAVED_CARDS_KEY = 'savedCards';

export const uniqueKey = ({name, title, expansion}) => name + '-' + title + '-' + expansion;

export const getSavedCards = () => JSON.parse(localStorage.getItem(SAVED_CARDS_KEY)) || {};

export const addSavedCard = (card) => {
  const cards = getSavedCards();
  const updatedCards = {
    ...cards,
    [uniqueKey(card)]: card,
  }
  setSavedCards(updatedCards);
}

export const removeSavedCard = (card) => {
  const cards = getSavedCards();
  const updatedCards = Object.fromEntries(
    Object.entries(cards)
      .filter(([k,v]) => k !== uniqueKey(card))
  );
  setSavedCards(updatedCards);
}

const setSavedCards = (cards) => localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(cards));




