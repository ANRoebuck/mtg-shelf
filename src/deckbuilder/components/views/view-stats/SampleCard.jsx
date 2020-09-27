import React, { useState } from "react";
import { face } from "../../../utils/enums";
import { parseImgSource } from "../../../utils/utils";

const SampleCard = ({ card, index }) => {

  const [showFace, setShowFace] = useState(face.FRONT);

  const mouseInOut = () => {
    if (card.layout === 'transform') setShowFace(() => showFace === face.FRONT ? face.BACK : face.FRONT);
  }

  const src = parseImgSource(card, showFace);

  return (
    <div className={`card ${index}`} >
      <img
        className="card-img"
        src={src}
        alt={`${card.name}`}
        onMouseEnter={mouseInOut}
        onMouseLeave={mouseInOut}
      />
    </div>
  );
};

export default SampleCard;