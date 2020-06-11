import React from "react";
import Card from "./Card";

const DeckListColumn = ({ cmc, cards, sideInOrOut }) => {

  const lastCard = cards.length -1;
  const cardsToDisplay = cards.map((card, i) =>
    <Card card={card} covered={i < lastCard} sideInOrOut={sideInOrOut}/>);

  return (
    <div className="deckListColumn">
      {cardsToDisplay}
    </div>
  );
};

export default DeckListColumn;