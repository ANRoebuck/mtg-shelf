import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectMaindeck } from "../../../../store/deckBuilder-selector";
import SampleCard from "./SampleCard";
import { randomSubSet } from "../../../../common/utils";

const StatsTableSampleHand = () => {

  const maindeck = useSelector(selectMaindeck);
  const [hand, setHand] = useState([]);

  const draw7 = () => setHand(randomSubSet(maindeck, 7));
  const mulligan = () => setHand(hand => randomSubSet(maindeck, hand.length - 1));

  const sampleHand = hand.map((card, i) => <SampleCard card={card} index={i}/>)

  return (
    <div className="single-stat sample-hand">
      <div className="buttons">
        <div>Sample Hand</div>
        <button type="button" onClick={draw7}>Draw 7</button>
        <button type="button" onClick={mulligan}>Mulligan</button>
      </div>
      {sampleHand}
    </div>
  );
};

export default StatsTableSampleHand;