import axios from 'axios';

const ctm = 'https://mtg-ctm-be.herokuapp.com/api';
const scryfall = 'https://api.scryfall.com/';

export const getPrices = (seller, searchTerm) => axios
  .post(`${ctm}/prices`, { seller, searchTerm })
  .then(({ data }) => data.prices)
  .catch(() => []);

export const searchCards = (searchTerm) => axios
  .get(`${scryfall}/cards/search?q=${searchTerm}`)
  .then(({ data }) => data.data);

export const getAutocompleteSuggestions = (searchTerm) => axios
  .get(`${scryfall}/cards/autocomplete?q=${searchTerm}`)
  .then(({ data }) => data.data);

export const getImgBytes = (imgUri) => axios
  .get(imgUri)
  .then(({ data }) => data);
