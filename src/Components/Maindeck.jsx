import React, { useState } from "react";
import DeckListColumn from "./DeckListColumn";
import ColumnSorter, { sortBy } from "./ColumnSorter";
import DecklistOptions from './DecklistOptions';

const Maindeck = ({ maindeck, sideOut }) => {

  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  // const [splitColumnsBy, setSplitcolumnsBy] = useState();

  const columnSorter = new ColumnSorter();
  const columns = columnSorter.assignColumns(maindeck, sortColumnsBy);

  const columnsToRender = Object.entries(columns).map((entry) => {
    const [cmc, cards] = entry;
    return <DeckListColumn cmc={cmc} cards={cards} sideInOrOut={sideOut} />
  })

  return (
    <div className="maindeck">
      <DecklistOptions options={Object.keys(sortBy)} setSortBy={setSortColumnsBy}/>
      {columnsToRender}
    </div>
  );
};

export default Maindeck;