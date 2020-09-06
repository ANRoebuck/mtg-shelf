import React from "react";
import OptionSetImages from "./OptionSetImages";
import { sortIcons, splitIcons, viewIcons } from "../utils/enums";
import './decklist-options.scss';

const DecklistOptions = ({ sortOptions, setSortBy, splitOptions, setSplitBy, viewOptions, setViewBy }) => {

  return (
    <div className="decklist-options">
      <OptionSetImages options={sortOptions} sources={sortIcons} selectOption={setSortBy} />
      <OptionSetImages options={splitOptions} sources={splitIcons} selectOption={setSplitBy} />
      <OptionSetImages options={viewOptions} sources={viewIcons} selectOption={setViewBy} />
    </div>
  );
}

export default DecklistOptions;