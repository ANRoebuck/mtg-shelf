import React, { useState } from "react";

const DecklistOptions = ({ sortOptions, setSortBy, splitOptions, setSplitBy, viewOptions, setViewBy }) => {

  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  const [selectedSplitOption, setSelectedSplitOption] = useState(splitOptions[0]);
  const [setlectedViewOption, setSelectedViewOption] = useState(viewOptions[0]);

  const reSort = (e) => {
    setSelectedSortOption(e.target.value);
    setSortBy(e.target.value);
  };

  const reSplit = (e) => {
    setSelectedSplitOption(e.target.value);
    setSplitBy(e.target.value);
  };

  const reView = (e) => {
    setSelectedViewOption(e.target.value);
    setViewBy(e.target.value);
  };

  const sortOptionsToRender = sortOptions.map(option => {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            value={option}
            checked={option === selectedSortOption}
            onChange={reSort}/>
          {option}
        </label>
      </div>
    );
  });

  const splitOptionstoRender = splitOptions.map(option => {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            value={option}
            checked={option === selectedSplitOption}
            onChange={reSplit}/>
          {option}
        </label>
      </div>
    );
  });

  const viewOptionsToRender = viewOptions.map(option => {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            value={option}
            checked={option === setSelectedViewOption}
            onChange={reView}/>
          {option}
        </label>
      </div>
    );
  });

  return (
    <div className="decklist-options">
      <div>Sort columns by:</div>
      {sortOptionsToRender}
      <div>Split columns by:</div>
      {splitOptionstoRender}
      <div>View by:</div>
      {viewOptionsToRender}
    </div>
  );
}

export default DecklistOptions;