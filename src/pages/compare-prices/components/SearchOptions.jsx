import React, { useEffect } from 'react';
import useLocalStorage from '../../../common/custom-hooks/useLocalStorage';

const SearchOptions = ({ title, options, defaultIndex = 0, selectOption, localStorageKey }) => {

  const [selectedSortOption, setSelectedSortOption] = useLocalStorage(localStorageKey, options[defaultIndex]);
  useEffect(() => selectOption(selectedSortOption), [selectedSortOption]);

  const optionsToRender = options.map(option => {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            value={option}
            checked={option === selectedSortOption}
            onChange={(e) => setSelectedSortOption(e.target.value)}/>
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
