import React from "react";
import DeckListColumn from "./DeckListColumn";
import { splitBy } from "./enums";

const Sideboard = ({ sideboard, sideIn, removeCard }) => {

  return (
    <div className="sideboard">
      <DeckListColumn cards={sideboard} sideInOrOut={sideIn} split={splitBy.none} removeCard={removeCard} />
    </div>
  );
};

export default Sideboard;