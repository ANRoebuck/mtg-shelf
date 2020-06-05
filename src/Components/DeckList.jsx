import React from "react";
import DeckListColumn from "./DeckListColumn";

const DeckList = ({ deckList }) => {

  const columns = deckList.reduce((columns, card) => {
    const { cmc } = card;
    if (!columns[cmc]) columns[cmc] = [card];
    else columns[cmc].push(card);
    return columns;
  }, {});

  const columnsToRender = Object.entries(columns).map((entry) => {
    const [cmc, cards] = entry;
    return <DeckListColumn cmc={cmc} cards={cards} />
  })

  return (
    <div className="deckList">
      {columnsToRender}
    </div>
  );
};

export default DeckList;