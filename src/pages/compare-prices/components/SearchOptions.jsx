import React, { useState } from "react";

const SearchOptions = ({ title, options, selectOption }) => {

  const [selectedSortOption, setSelectedSortOption] = useState(options[0]);

  const changeSort = (e) => {
    setSelectedSortOption(e.target.value);
    selectOption(e.target.value);
  };

  const optionsToRender = options.map(option => {
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
      <div className={"option-set"}>
        <label>
          {title}:
          {optionsToRender}
        </label>
      </div>
  );
}

export default SearchOptions;
