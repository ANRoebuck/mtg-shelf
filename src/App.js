import React, { useEffect, useState } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './app.scss';
import Home from "./Home";
import NavigationIcon from "./navigation-bar/NavigationIcon";
import ComparePrices from "./compare-prices/ComparePrices";
import DeckBuilder from "./deckbuilder/DeckBuilder";
import Game from "./game/Game";
import { w3cwebsocket as W3CWebSocket } from "websocket/lib/websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const handshake = () => {
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  }
}

const App = () => {

  const pages = {
    home: 'Home',
    comparePrices: 'Compare Prices',
    deckBuilder: 'Deck Builder',
    // draft: 'Draft',
    game: 'Game',
  }

  const [display, setDisplay] = useState(pages.home);

  const [client, setClient] = useState(null);

  useEffect(() => setClient(handshake()), []);


  const navigationIcons = Object.values(pages).map((page, i) =>
    <NavigationIcon page={page} value={i} active={display === page} setDisplay={setDisplay}/>);

  const getPageToDisplay = () => {
    switch (display) {
      case pages.comparePrices:
        return <ComparePrices/>;
      case pages.deckBuilder:
        return <DeckBuilder/>;
      case pages.game:
        return <Game />;
      default:
        return <Home/>;
    }
  }

  const pageToDisplay = getPageToDisplay();

  return (
    // <Router>
    <div className="App">
      {/*<ul className="menu">*/}
      {/*  <li className="menu-item"><Link exact to={'/'}>Home</Link></li>*/}
      {/*  <li className="menu-item"><Link to={'/comparePrices'}>Compare Prices</Link></li>*/}
      {/*  <li className="menu-item"><Link to={'/deckBuilder'}>Deck Builder</Link></li>*/}
      {/*  <li className="menu-item"><Link to={'/game'}>Game</Link></li>*/}
      {/*</ul>*/}

      <div className="menu">
        {navigationIcons}
      </div>

      <hr/>

      {pageToDisplay}

      {/*<Route exact path='/' component={Home}/>*/}
      {/*<Route path='/comparePrices' component={ComparePrices}/>*/}
      {/*<Route path='/deckBuilder' component={DeckBuilder}/>*/}
      {/*<Route path='/game' component={Game}/>*/}
    </div>
    // </Router>
  );
}

export default App;
