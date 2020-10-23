import React, { useEffect, useState } from 'react';
import './game.scss';
import { useSelector } from "react-redux";
import { selectDecklist, selectDeckName, selectMaindeck } from "../store/deckBuilder-selector";
import Card from "./Card";
import { randomFromArray } from "../common/utils";
import NewGameCreator from "./NewGameCreator";
import Playmat from "./Playmat";

const Game = () => {

  // const deckName = useSelector(selectDeckName);
  // const deckList = useSelector(selectDecklist);
  const maindeck = useSelector(selectMaindeck);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [selectedDeck, setSelectedDeck] = useState({name: 'Select Deck', deck: []});

  return (
    gameStarted ?
      <Playmat />
      :
      <NewGameCreator gameStarted={gameStarted} setGameStarted={setGameStarted}/>
  );
};

export default Game;