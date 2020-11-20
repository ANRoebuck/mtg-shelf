import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectDecklist, selectDeckName, selectMaindeck } from "../store/deckBuilder-selector";

const NewGameMenu = ({ setGameStarted }) => {

  // const deckName = useSelector(selectDeckName);
  // const deckList = useSelector(selectDecklist);
  const maindeck = useSelector(selectMaindeck);

  const [gameId, setGameId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [selectedDeck, setSelectedDeck] = useState({name: 'Select Deck', deck: []});


  const handleClick = () => setGameStarted(toggle => !toggle);

  return (
    <div className="game-menu">

      <button type="button" onClick={handleClick}>New Game</button>

    </div>
  );

};

export default NewGameMenu;
