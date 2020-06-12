import React from "react";
import DeckListColumn from "./DeckListColumn";
import { splitBy } from "./enums";

const Sideboard = ({ sideboard, sideIn }) => {

  return (
    <div className="sideboard">
      <DeckListColumn cards={sideboard} sideInOrOut={sideIn} split={splitBy.none}/>
    </div>
  );
};

export default Sideboard;