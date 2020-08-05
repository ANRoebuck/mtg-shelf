import React, { useState } from "react";

const SearchOptions = ({ stockOptions, setSortStockBy }) => {

  const [selectedSortOption, setSelectedSortOption] = useState(stockOptions[0]);

  const changeSort = (e) => {
    setSelectedSortOption(e.target.value);
    setSortStockBy(e.target.value);
  };

  const sortOptionsToRender = stockOptions.map(option => {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            value={option}
            checked={option === selectedSortOption}
            onChange={changeSort}/>
          {option}
        </label>
      </div>
    );
  });

  return (
    <div className="decklist-options">
      <div className={"option-set"}>
        <div>Sort columns:</div>
        {sortOptionsToRender}
      </div>
    </div>
  );
}

export default SearchOptions;