import React, { useState } from "react";
import { parseImgSource } from "./utils";
import { face } from "./enums";

const Card = ({card, covered, sideInOrOut}) => {
  const [showFace, setShowFace] = useState(face.FRONT);

  const handleClick = () => {
    sideInOrOut(card);
  }

  const mouseInOut = () => {
    if (card.layout === 'transform') setShowFace(() => showFace === face.FRONT ? face.BACK : face.FRONT);
  }

  const src = parseImgSource(card, showFace);

  return (
    <div
      className={`card${covered ? ' covered' : ''}`}
      onMouseEnter={mouseInOut}
      onMouseLeave={mouseInOut}
      onClick={handleClick}
    >
      <img className="card-img" src={src}/>
    </div>
  );
};

export default Card;