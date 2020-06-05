import React, { useState } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import DeckBuilder from "./DeckBuilder";
import Home from "./Home";
import Tool2 from "./Tool2";
import PTtool from "./PTtool"

const App = () => {

  return (
    <Router>
      <div className="App">

          <ul className="menu">
            <li className="menu-item"><Link exact to={'/'}>Home</Link></li>
            <li className="menu-item"><Link to={'/deckBuilder'}>Deck Builder</Link></li>
            <li className="menu-item"><Link to={'/someOtherTool'}>Another Tool</Link></li>
            <li className="menu-item"><Link to={'/ptTop8'}>PT Top 8 Tool</Link></li>
          </ul>

          <hr/>

          <Route exact path='/' component={Home}/>
          <Route path='/deckBuilder' component={DeckBuilder}/>
          <Route path='/someOtherTool' component={Tool2}/>
          <Route path='/ptTop8' component={PTtool}/>

      </div>
    </Router>
  );
}

// {/*<img src={logo} className="App-logo" alt="logo"/>*/}

export default App;
