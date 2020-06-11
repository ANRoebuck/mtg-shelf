import React from "react";
import Maindeck from './Maindeck';
import Sideboard from './Sideoard';

const DeckList = ({ maindeck, sideboard, sideIn, sideOut }) => {

  return (
    <div className="decklist">
      <Maindeck maindeck={maindeck} sideOut={sideOut}/>
      <Sideboard sideboard={sideboard} sideIn={sideIn}/>
    </div>
  );
};

export default DeckList;