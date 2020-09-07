import React from "react";
import Card from "./Card";

const DeckListColumn = ({ cards, sideInOrOut }) => {

  const cardsToDisplay = cards.map((card, i) =>
    <Card card={card} covered={i < cards.length -1} sideInOrOut={sideInOrOut} />);

  return (
    <div className="decklist-column">
      {cardsToDisplay}
    </div>
  );
};

export default DeckListColumn;