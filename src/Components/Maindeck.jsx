import React, { useState } from "react";
import { splitBy } from "./ColumnSplitter";
import ColumnSorter, { sortBy } from "./ColumnSorter";
import DeckListColumn from "./DeckListColumn";
import DecklistOptions from "./DecklistOptions";


const Maindeck = ({ maindeck, sideOut }) => {

  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  const [splitColumnsBy, setSplitColumnsBy] = useState(splitBy.noSplit);

  const columnSorter = new ColumnSorter();
  const columns = columnSorter.assignColumns(maindeck, sortColumnsBy);

  const columnsToRender = Object.entries(columns).map(([ cmc, cards ]) =>
    <DeckListColumn cards={cards} sideInOrOut={sideOut} split={splitColumnsBy} />);

  return (
    <div className="maindeck">
      <DecklistOptions
        sortOptions={Object.keys(sortBy)}
        setSortBy={setSortColumnsBy}
        splitOptions={Object.keys(splitBy)}
        setSplitBy={setSplitColumnsBy}/>
      {columnsToRender}
    </div>
  );
};

export default Maindeck;