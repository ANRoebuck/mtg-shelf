import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectDecklist, selectDeckName, selectMaindeck } from "../store/deckBuilder-selector";
import Card from "./Card";
import { randomFromArray } from "../common/utils";
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const handshake = () => {
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  }
}

const NewGameMenu = ({ setGameStarted }) => {

  // const deckName = useSelector(selectDeckName);
  // const deckList = useSelector(selectDecklist);
  const maindeck = useSelector(selectMaindeck);

  const [client, setClient] = useState(null);
  const [gameId, setGameId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [selectedDeck, setSelectedDeck] = useState({name: 'Select Deck', deck: []});

  useEffect(() => setClient(handshake()), []);

  const handleClick = () => setGameStarted(toggle => !toggle);

  return (
    <div className="game-menu">

      <button type="button" onClick={handleClick}>New Game</button>

    </div>
  );

};

export default NewGameMenu;
