import React, { useState } from 'react';
import { searchCards } from '../../../gateway/http';
import SearchResult from './SearchResult';
import './cardsearch.scss';

const CardSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);

  const onChange = (event) => setSearchTerm(event.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    searchCards(searchTerm).then((cards) => {
      setSearchTerm('');
      setCards(cards)
    });
  };

  const lastCard = cards.length -1;
  const searchResults = cards.map((card, i) =>
    <SearchResult card={card} covered={i < lastCard}/>);

  return (
    <div className="card-search">
      <form onSubmit={(e) => onSubmit(e)}>
        <label>
          Card Search:
          <input type="text" value={searchTerm} onChange={(e) => onChange(e)} />
        </label>
      </form>
      <div className="search-results">
        {searchResults}
      </div>
    </div>
  )
}

export default CardSearch;
