import React from "react";
import Maindeck from './Maindeck';
import Sideboard from './Sideoard';

const DeckList = ({ decklist, sideIn, sideOut }) => {
  const maindeck = decklist.filter(({ ms }) => ms === 'm');
  const sideboard = decklist.filter(({ ms }) => ms === 's');

  return (
    <div className="decklist">
      <Maindeck maindeck={maindeck} sideOut={sideOut}/>
      <Sideboard sideboard={sideboard} sideIn={sideIn}/>
    </div>
  );
};

export default DeckList;