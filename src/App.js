import React, { useState } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './app.scss';
import DeckBuilder from "./deckbuilder/DeckBuilder";
import Home from "./Home";
import ComparePrices from "./compare-prices/ComparePrices";
import NavigationIcon from "./navigation-bar/NavigationIcon";

const App = () => {

  const pages = {
    home: 'Home',
    comparePrices: 'Compare Prices',
    deckBuilder: 'Deck Builder',
    // draft: 'Draft',
    // game: 'Game',
  }

  const [display, setDisplay] = useState(pages.home);

  const navigationIcons = Object.values(pages).map((page, i) =>
    <NavigationIcon page={page} value={i} active={display === page} setDisplay={setDisplay}/>);

  const getPageToDisplay = () => {
    switch (display) {
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
    // <Router>
    <div className="App">
      {/*<ul className="menu">*/}
      {/*  <li className="menu-item"><Link exact to={'/'}>Home</Link></li>*/}
      {/*  <li className="menu-item"><Link to={'/deckBuilder'}>Deck Builder</Link></li>*/}
      {/*  <li className="menu-item"><Link to={'/comparePrices'}>Compare Prices</Link></li>*/}
      {/*</ul>*/}

      <div className="menu">
        {navigationIcons}
      </div>

      <hr/>

      {pageToDisplay}

      {/*<Route exact path='/' component={Home}/>*/}
      {/*<Route path='/deckBuilder' component={DeckBuilder}/>*/}
      {/*<Route path='/comparePrices' component={ComparePrices}/>*/}
    </div>
    // </Router>
  );
}

export default App;
