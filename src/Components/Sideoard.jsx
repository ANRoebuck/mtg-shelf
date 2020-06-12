import React from "react";
import DeckListColumn from "./DeckListColumn";
import { splitBy } from "./ColumnSplitter";

const Sideboard = ({ sideboard, sideIn }) => {

  return (
    <div className="sideboard">
      <DeckListColumn cards={sideboard} sideInOrOut={sideIn} split={splitBy.noSplit}/>
    </div>
  );
};

export default Sideboard;