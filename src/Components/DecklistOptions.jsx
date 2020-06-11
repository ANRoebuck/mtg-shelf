import React, { useState } from "react";
import DeckListColumn from "./DeckListColumn";
import ColumnSorter, { sortBy } from "./ColumnSorter";

const DecklistOptions = ({ options, setSortBy }) => {

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

export default DecklistOptions;