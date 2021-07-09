
// Bookmarks
const SAVED_CARDS_KEY = 'savedCards';

export const uniqueSavedResultKey = ({name, title, expansion}) => name + '-' + title + '-' + expansion;
export const getSavedCards = () => JSON.parse(localStorage.getItem(SAVED_CARDS_KEY)) || {};
const setSavedCards = (cards) => localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(cards));
export const addSavedCard = (card) => {
  const cards = getSavedCards();
  const updatedCards = {
    ...cards,
    [uniqueSavedResultKey(card)]: card,
  }
  setSavedCards(updatedCards);
}
export const removeSavedCard = (card) => {
  const cards = getSavedCards();
  const updatedCards = Object.fromEntries(
    Object.entries(cards)
      .filter(([k,v]) => k !== uniqueSavedResultKey(card)));
  setSavedCards(updatedCards);
}


// Cached Results
const CACHED_RESULTS_PREFIX = 'cachedResults_';

const getCachedResultsForSeller = (sellerName) =>
  JSON.parse(sessionStorage.getItem(CACHED_RESULTS_PREFIX + sellerName)) || {};
const setCachedResultsForSeller = (sellerName, resultsToCache) =>
  sessionStorage.setItem(CACHED_RESULTS_PREFIX + sellerName, JSON.stringify(resultsToCache));
export const setCachedResultsForSearch = (sellerName, searchTerm, results) => {
  // const timeStamp = null;
  const resultsToCache = {
    // timeStamp,
    results,
  };
  const cachedResultsForSeller = getCachedResultsForSeller(sellerName);
  const updatedResultsToCache = {
    ...cachedResultsForSeller,
    [searchTerm]: resultsToCache,
  };
  setCachedResultsForSeller(sellerName, updatedResultsToCache);
};
export const getCachedResultsForSearch = (sellerName, searchTerm) =>
  getCachedResultsForSeller(sellerName)?.[searchTerm]?.results;




