import React, { useEffect, useState } from 'react';
import './game.scss';
import { useSelector } from "react-redux";
import { selectDecklist, selectDeckName, selectMaindeck } from "../store/deckBuilder-selector";
import Card from "./Card";
import { randomFromArray } from "../common/utils";

const Playmat = () => {

  // const deckName = useSelector(selectDeckName);
  // const deckList = useSelector(selectDecklist);
  const maindeck = useSelector(selectMaindeck);

  const [library, setLibrary] = useState([]);
  const [hand, setHand] = useState([]);
  const [battlefield, setBattlefield] = useState([]);
  const [graveyard, setGraveyard] = useState([]);
  const [exile, setExile] = useState([]);

  useEffect(() => setLibrary(() => maindeck), [maindeck]);

  const draw = () => {
    const cardDrawn = randomFromArray(library);
    removeCard(cardDrawn, library, setLibrary);
    addCard(cardDrawn, setHand);
  }

  const moveCard = (card, targetLocation) => {
    removeFromEverywhere(card);
    switch (targetLocation) {
      case "hand" :
        addCard(card, setHand);
        break;
      case "battlefield" :
        addCard(card, setBattlefield);
        break;
      case "graveyard" :
        addCard(card, setGraveyard);
        break;
      case "exile" :
        addCard(card, setExile);
        break;
      default :
        return null;
    }
  };

  const addCard = (cardToAdd, setter) => setter(prevCards => prevCards.concat([cardToAdd]));
  const removeCard = (cardToRemove, cards, setter) => setter(() => cards.filter(({index}) => index !== cardToRemove.index));

  const removeFromEverywhere = (cardToRemove) => {
    removeCard(cardToRemove, hand, setHand);
    removeCard(cardToRemove, battlefield, setBattlefield);
    removeCard(cardToRemove, graveyard, setGraveyard);
    removeCard(cardToRemove, exile, setExile);
  }

  const allowDrop = (e) => e.preventDefault();
  const onDragStart = (e, card, origin) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
    e.dataTransfer.setData("origin", origin);
  }
  const onDrop = (e, targetLocation) => {
    e.preventDefault();
    if (e.dataTransfer.getData("origin") === targetLocation) return;
    moveCard(JSON.parse(e.dataTransfer.getData("card")), targetLocation);
  };

  const displayHand = hand.map(card => <Card card={card} onDragStart={onDragStart} originArea="hand"/>);
  const displayBattlefield = battlefield.map(card => <Card card={card} onDragStart={onDragStart}
                                                           originArea="battlefield"/>);
  const displayGraveyard = graveyard.map(card => <Card card={card} onDragStart={onDragStart} originArea="graveyard"/>);
  const displayExile = exile.map(card => <Card card={card} onDragStart={onDragStart} originArea="exile"/>);

  return (
      <div className="game">

        <div className="library" value="library">
          <div>{`Cards in Library: ${library.length}`}</div>
          <button type="button" onClick={draw}>Draw 1</button>
          <img/>
        </div>

        <div
          className="box hand"
          value="hand"
          onDragOver={(e) => allowDrop(e)}
          onDrop={(e) => onDrop(e, 'hand')}
        >
          {displayHand}
        </div>
        <div
          className="box battlefield"
          value="battlefield"
          onDragOver={(e) => allowDrop(e)}
          onDrop={(e) => onDrop(e, 'battlefield')}
        >
          {displayBattlefield}
        </div>

        <div
          className="box graveyard"
          value="graveyard"
          onDragOver={(e) => allowDrop(e)}
          onDrop={(e) => onDrop(e, 'graveyard')}
        >
          {displayGraveyard}
        </div>

        {/*<div*/}
        {/*  className="box exile"*/}
        {/*  value="exile"*/}
        {/*  onDragOver={(e) => allowDrop(e)}*/}
        {/*  onDrop={(e) => onDrop(e, 'exile')}*/}
        {/*>*/}
        {/*  Exile*/}
        {/*  {displayExile}*/}
        {/*</div>*/}

      </div>
  );
};

export default Playmat;