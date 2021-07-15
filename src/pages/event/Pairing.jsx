import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pairing.scss';


const Pairing = ({pairing, submitResultForPairing, completed}) => {
  const [p1, p2] = pairing;

  const p1Name = p1.player === "BYE" ? "BYE" : `${p1.player} : (${p1.points}pts)`;
  const p2Name = p2.player === "BYE" ? "BYE" : `${p2.player} : (${p2.points}pts)`;
  const matchIsBye = [p1Name, p2Name].includes("BYE");

  return (
    <div className={`pairing ${completed ? 'completed' : ''}`}>

      <div className="button-container">
        <button onClick={() => submitResultForPairing(pairing, p1.player, p1.player)} disabled={matchIsBye}>
          Win
        </button>
      </div>

      <div className="player">
        {p1Name}
      </div>

      <div className="button-container">
        <button onClick={() => submitResultForPairing(pairing, p1.player, "DRAW")} disabled={matchIsBye}>
          Draw
        </button>
      </div>

      <div className="player">
        {p2Name}
      </div>

      <div className="button-container">
        <button onClick={() => submitResultForPairing(pairing, p1.player, p2.player)} disabled={matchIsBye}>
          Win
        </button>
      </div>

    </div>
  )
};

export default Pairing;
