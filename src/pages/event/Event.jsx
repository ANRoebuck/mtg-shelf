import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pairing from "./Pairing";


const baseUrl = 'http://localhost:9090/api/eventManager/';

const Event = () => {

  const [eventId, setEventId] = useState(null);
  const [pairings, setPairings] = useState([]);


  const createEvent = () => axios.get(baseUrl + 'new/12').then(({data}) => {
    console.log(data);
    setEventId(data.eventId);
  });

  const getPairings = () => axios.get(baseUrl + `pairings/${eventId}/1`).then(({data}) => {
    console.log(data);
    setPairings(data.pairings)
  });

  return (
    <div className="event">

      {eventId ?
        <div className="event-button">
          EventId: {eventId}
        </div>
        :
        <div className="event-button" onClick={() => createEvent()}>
          Create new event
        </div>
      }


      <div className="pairings-button" onClick={() => getPairings()}>
        Get pairings
      </div>

      <div className="pairings">
        {pairings.map(pairing => <Pairing pairing={pairing}/>)}
      </div>

    </div>
  );
}

export default Event;
