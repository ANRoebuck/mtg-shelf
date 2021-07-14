import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './pairing.scss';


const Pairing = ({pairing}) => {
  const [p1, p2] = pairing;
  return (
    <div className="pairing">

      <div className="button-container">
        <button>
          Win
        </button>
      </div>

      <div className="player">
        {`Player ${p1.player} (${p1.points}pts)`}
      </div>

      <div className="button-container">
        <button>
          Draw
        </button>
      </div>

      <div className="player">
        {`Player ${p2.player} (${p1.points}pts)`}
      </div>

      <div className="button-container">
        <button>
          Win
        </button>
      </div>

    </div>
  )
};

export default Pairing;
