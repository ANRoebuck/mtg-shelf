import React, { useState } from "react";
import { parseImgSource } from "./utils";
import { face } from "./enums";
import useRefCreator from "./useRefCreator";
import ContextMenu from "./ContextMenu";
import { removeCard } from "../store/deckBuilder-actions";

const Card = ({card, covered, sideInOrOut }) => {
  const [ref, updateRef] = useRefCreator();
  const [showFace, setShowFace] = useState(face.FRONT);

  const handleClick = () => sideInOrOut(card);

  const mouseInOut = () => {
    if (card.layout === 'transform') setShowFace(() => showFace === face.FRONT ? face.BACK : face.FRONT);
  }

  const src = parseImgSource(card, showFace);

  const contextMenuItems = [
    {
      label: `Move to ${card.ms === 'm' ? 'sideboard' : 'maindeck'}`,
      callback: () => sideInOrOut(card)
    },
    {
      label: `Remove from deck`,
      callback: () => removeCard(card)
    },
  ];

  return (
    <div className={`card${covered ? ' covered' : ''} index=${card.index}`} ref={updateRef} >
      <ContextMenu containerRef={ref} menuItems={contextMenuItems}/>
      <img
        className="card-img"
        src={src}
        alt={`${card.name}`}
        onMouseEnter={mouseInOut}
        onMouseLeave={mouseInOut}
        onClick={handleClick}
      />
    </div>
  );
};

export default Card;