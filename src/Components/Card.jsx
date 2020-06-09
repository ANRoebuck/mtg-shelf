import React, { useState } from "react";
import { parseImgSource } from "./utils";
import { face } from "./enums";

const Card = ({card, covered}) => {

  const [showFace, setShowFace] = useState(face.FRONT);

  const handleClick = () => {
    if(card.layout === 'transform') {
      setShowFace(() => showFace === face.FRONT ? face.BACK : face.FRONT);
    }
  }

  const src = parseImgSource(card, showFace);

  return (
    <div className={`card${covered ? ' covered' : ''}`} onClick={handleClick}>
      <img className="card-img" src={src}/>
    </div>
  );
};

export default Card;