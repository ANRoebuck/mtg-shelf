import React, { useState } from 'react';
import { searchCards } from "../Gateway/http";

const CardSearch = () => {
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

  const cardsToDisplay = cards.map(({ name }) => <div>{name}</div>);

  return (
    <div className="card-search">
      <form onSubmit={(e) => onSubmit(e)}>
        <label>
          Card Search:
          <input type="text" value={searchTerm} onChange={(e) => onChange(e)} />
        </label>
      </form>
      <div>
        {cardsToDisplay}
      </div>
    </div>
  )
}

export default CardSearch;