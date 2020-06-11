import React, { useState } from "react";
import DeckListColumn from "./DeckListColumn";
import ColumnSorter, { sortBy } from "./ColumnSorter";

const Sideboard = ({ sideboard, sideIn }) => {

  return (
    <div className="sideboard">
      <DeckListColumn cmc={0} cards={sideboard} sideInOrOut={sideIn}/>
    </div>
  );
};

export default Sideboard;