import React, { useState } from 'react';
import './app.scss';
import NavBar from './navigation-bar/NavBar';
import DeckBuilder from "./pages/deckbuilder/DeckBuilder";
import Home from "./pages/home/Home";
import ComparePrices from "./pages/compare-prices/ComparePrices";

const App = () => {

  const pages = {
    home: 'Home',
    comparePrices: 'Compare Prices',
    deckBuilder: 'Deck Builder',
    draft: 'Draft',
    // game: 'Game',
  }

  const [selected, setSelected] = useState(pages.home);

  const getPageToDisplay = () => {
    switch (selected) {
      case pages.deckBuilder:
        return <DeckBuilder/>;
      case pages.comparePrices:
        return <ComparePrices/>;
      default:
        return <Home/>;
    }
  }

  const pageToDisplay = getPageToDisplay();

  return (
    <div className="App">

      <NavBar pages={pages} selected={selected} setSelected={setSelected}/>

      <div className="real-shit">
        {pageToDisplay}
      </div>

    </div>
  );
}

export default App;
