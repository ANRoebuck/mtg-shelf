import React, { useState } from 'react';
import './playmat.scss';
import Playmat from "./Playmat";
import NewGameMenu from "./NewGameMenu";
import { selectMaindeck } from "../store/deckBuilder-selector";
import { useSelector } from "react-redux";

const Game = () => {

  const maindeck = useSelector(selectMaindeck);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [selectedDeck, setSelectedDeck] = useState({name: 'Select Deck', deck: []});

  return (
    gameStarted ?
      <Playmat />
      :
      <NewGameMenu gameStarted={gameStarted} setGameStarted={setGameStarted}/>
  );
};

export default Game;
