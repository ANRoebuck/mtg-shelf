import React, { useState } from 'react';
import './app.scss';
import NavBar from './navigation-bar/NavBar';
import DeckBuilder from './pages/deckbuilder/DeckBuilder';
import Home from './pages/home/Home';
import ComparePrices from './pages/compare-prices/ComparePrices';
import Draft from './pages/draft/Draft';
import Game from './pages/game/Game';

const App = () => {

  const pages = {
    home: 'Home',
    comparePrices: 'Compare Prices',
    deckBuilder: 'Deck Builder',
    draft: 'Feature',
    game: 'Feature',
  }

  const [selected, setSelected] = useState(pages.home);

  const getPageToDisplay = () => {
    switch (selected) {
      case pages.comparePrices:
        return <ComparePrices/>;
      case pages.deckBuilder:
        return <DeckBuilder/>;
      case pages.draft:
        return <Draft />;
      case pages.game:
        return <Game />;
      default:
        return <Home/>;
    }
  }

  const pageToDisplay = getPageToDisplay();

  return (
    <div className="App">

      <div className="page">
        <ComparePrices/>
      </div>

    </div>
  );
}

export default App;
