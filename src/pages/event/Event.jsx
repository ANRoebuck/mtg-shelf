import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pairing from "./Pairing";
import './event.scss';


const host = 'https://mtg-shelf-event-manager.herokuapp.com/'
const localHost = 'http://localhost:9090/';
const baseUrl = localHost + 'api/eventManager/';

const Event = () => {

  const [eventId, setEventId] = useState(null);
  const [pairings, setPairings] = useState([]);
  const [completedMatches, setCompletedMatches] = useState([]);
  const [inputValue, setInputValue] = useState(8);


  const createEvent = () => {
    axios.get(baseUrl + `new/${inputValue}`).then(({data}) => setEventId(data.eventId));
  }

  const getPairings = () => axios
    .get(baseUrl + `currentRound/${eventId}`)
    .then(({data}) => axios.get(baseUrl + `pairings/${eventId}/${data.currentRound}`))
    .then(({data}) => {
      setCompletedMatches([]);
      setPairings(data.pairings);
      markByeComplete(data.pairings);
    });

  const markByeComplete = (pairings) => {
    const bye = pairings.filter(([p1, p2]) => [p1.player, p2.player].includes("BYE"))[0] || null;
    if (bye) completePairing(bye);
  }

  const submitResultForPairing = (pairing, playerId, result) =>
    axios.post(baseUrl + `result/${eventId}/${playerId}/${result}`)
      .then((r) => completePairing(pairing));

  const completePairing = (pairing) => {
    setPairings(prev => prev.filter(p => p != pairing));
    setCompletedMatches(prevState => {
      const updatedState = [...prevState];
      updatedState.push(pairing);
      return updatedState;
    });
  }

  return (
    <div className="event">

      {eventId ?
        <div className="event-button">

        </div>
        :
        <div className="event-button" >
          <div className="input-container">
            <input type="number" value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)} min={8} max={1000} />
          </div>
          <button disabled={inputValue < 8} onClick={() => createEvent()}>
            Create new event
          </button>
        </div>
      }


      {eventId && pairings.length === 0 ?
        <div className="pairings-button">
          <button onClick={() => getPairings()}>
            Get pairings
          </button>
        </div>
        : null}

      <div className="pairings">
        {pairings.map(pairing =>
          <Pairing pairing={pairing} submitResultForPairing={submitResultForPairing} completed={false}/>)}

        {completedMatches.map(pairing =>
          <Pairing pairing={pairing} submitResultForPairing={submitResultForPairing} completed={true}/>)}
      </div>

    </div>
  );
}

export default Event;
