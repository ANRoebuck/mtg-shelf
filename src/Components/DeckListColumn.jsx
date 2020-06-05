import React from "react";
import SearchResult from "./SearchResult";

const DeckListColumn = ({ cmc, cards }) => {

  const lastCard = cards.length -1;
  const cardsToDisplay = cards.map((card, i) =>
    <SearchResult card={card} covered={i < lastCard}/>);

  return (
    <div className="deckListColumn">
      {cardsToDisplay}
    </div>
  );
};

export default DeckListColumn;