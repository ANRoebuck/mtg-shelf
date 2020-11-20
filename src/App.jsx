import React, { useEffect, useState } from 'react';
import './app.scss';
import Home from "./Home";
import NavigationIcon from "./navigation-bar/NavigationIcon";
import ComparePrices from "./compare-prices/ComparePrices";
import DeckBuilder from "./deckbuilder/DeckBuilder";
import Game from "./game/Game";
import { useDispatch } from "react-redux";
import { setWsConnection } from "./store/app-actions";
import { setUpWs } from "./gateway/ws";

const ws = new WebSocket("ws://127.0.0.1:8000");


const pages = {
  home: 'Home',
  comparePrices: 'Compare Prices',
  deckBuilder: 'Deck Builder',
  // draft: 'Draft',
  game: 'Game',
}

const App = () => {

  const [display, setDisplay] = useState(pages.home);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWsConnection(ws));
    setUpWs(ws);
    return () => {
      ws.current.close();
    };
  }, [dispatch]);

  const navigationIcons = Object.values(pages).map((page, i) =>
    <NavigationIcon page={page} value={i} active={display === page} setDisplay={setDisplay}/>);

  const getPageToDisplay = () => {
    switch (display) {
      case pages.comparePrices:
        return <ComparePrices/>;
      case pages.deckBuilder:
        return <DeckBuilder/>;
      case pages.game:
        return <Game/>;
      default:
        return <Home/>;
    }
  }

  const pageToDisplay = getPageToDisplay();

  return (
    <div className="App">

      <div className="menu">
        {navigationIcons}
      </div>

      <hr/>

      {pageToDisplay}

    </div>
  );
}

export default App;