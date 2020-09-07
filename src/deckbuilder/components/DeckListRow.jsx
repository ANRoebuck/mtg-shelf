import React from "react";
import ColumnSorter from "./ColumnSorter";
import DeckListColumn from "./DeckListColumn";

const DeckListRow = ({ cards, sideInOrOut, sortColumnsBy }) => {

  const columnSorter = new ColumnSorter();
  const columns = columnSorter.assignColumns(cards, sortColumnsBy);

  const columnsToRender = Object.values(columns).map((cards) =>
    <DeckListColumn cards={cards} sideInOrOut={sideInOrOut} />);

  return (
    <div className="decklist-row">
      {columnsToRender}
    </div>
  );
};

export default DeckListRow;