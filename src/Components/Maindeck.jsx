import React from "react";
import ColumnSorter from "./ColumnSorter";
import DeckListColumn from "./DeckListColumn";


const Maindeck = ({ maindeck, sideOut, sortColumnsBy, splitColumnsBy, removeCard }) => {

  const columnSorter = new ColumnSorter();
  const columns = columnSorter.assignColumns(maindeck, sortColumnsBy);

  const columnsToRender = Object.entries(columns).map(([ cmc, cards ]) =>
    <DeckListColumn cards={cards} sideInOrOut={sideOut} split={splitColumnsBy} removeCard={removeCard} />);

  return (
    <div className="maindeck">
      {columnsToRender}
    </div>
  );
};

export default Maindeck;