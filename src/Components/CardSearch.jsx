import React, { useState } from 'react';
import { searchCards } from '../Gateway/http';
import SearchResult from './SearchResult';

const CardSearch = ({ addCard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchCards(searchTerm).then(({data: cards}) => {
      setSearchTerm('');
      setCards(cards)
    });
  };

  const lastCard = cards.length -1;
  const searchResults = cards.map((card, i) =>
    <SearchResult card={card} addCard={addCard} covered={i < lastCard}/>);

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