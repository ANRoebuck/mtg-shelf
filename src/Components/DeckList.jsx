import React, { useState } from "react";
import DeckListColumn from "./DeckListColumn";
import ColumnSorter, { sortBy } from "./ColumnSorter";

const DeckListOptions = ({ options, setSortBy }) => {

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setSortBy(e.target.value);
  }

  const optionsToRender = options.map(option => {
    return (
      <div className="radio">
        <label>
          <input type="radio" value={option} checked={option === selectedOption} onChange={handleChange}/>
          {option}
        </label>
      </div>
    );
  });

  return (
    <div className="decklist-options">
      {optionsToRender}
    </div>
  );
}

const DeckList = ({ deckList }) => {

  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  const [splitColumnsBy, setSplitcolumnsBy] = useState();

  const columnSorter = new ColumnSorter();
  const columns = columnSorter.assignColumns(deckList, sortColumnsBy);

  const columnsToRender = Object.entries(columns).map((entry) => {
    const [cmc, cards] = entry;
    return <DeckListColumn cmc={cmc} cards={cards} />
  })

  return (
    <div className="deckList">
      <DeckListOptions options={Object.keys(sortBy)} setSortBy={setSortColumnsBy}/>
      {columnsToRender}
    </div>
  );
};

export default DeckList;