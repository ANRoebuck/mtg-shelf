import React from "react";
import Card from "./Card";
import ColumnSplitter from "./ColumnSplitter";

const DeckListColumn = ({ cards, sideInOrOut, split }) => {
  const columnSplitter = new ColumnSplitter();
  const splits = columnSplitter.splitColumnsBy(cards, split);

  const lastCard = cards.length -1;
  const cardsToDisplay = splits.map(split =>
    <div className="partial-decklist-column">
      {split.map((card, i) =>
        <Card card={card} covered={i < lastCard} sideInOrOut={sideInOrOut}/>
      )}
    </div>
  );

  return (
    <div className="decklist-column">
      {cardsToDisplay}
    </div>
  );
};

export default DeckListColumn;