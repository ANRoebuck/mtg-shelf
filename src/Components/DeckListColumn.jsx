import React from "react";
import Card from "./Card";
import ColumnSplitter from "./ColumnSplitter";

const DeckListColumn = ({ cards, sideInOrOut, split, removeCard }) => {

  const columnSplitter = new ColumnSplitter();
  const splits = columnSplitter.splitColumnsBy(cards, split);

  const cardsToDisplay = splits.map(split =>
    <div className="partial-decklist-column">
      {split.map((card, i) =>
        <Card card={card} covered={i < split.length -1} sideInOrOut={sideInOrOut} removeCard={removeCard} index={i}/>
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