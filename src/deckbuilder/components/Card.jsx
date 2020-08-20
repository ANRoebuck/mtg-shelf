import React, { useState } from "react";
import { parseImgSource } from "../utils/utils";
import { face } from "../utils/enums";
import useRefCreator from "../utils/useRefCreator";
import ContextMenu from "./ContextMenu";
import { addCardToMain, incrementMaindeckToX, removeAllByNameAndZone, removeCard } from "../../store/deckBuilder-actions";
import { useDispatch } from "react-redux";

const Card = ({card, covered, sideInOrOut }) => {

  const [ref, updateRef] = useRefCreator();
  const [showFace, setShowFace] = useState(face.FRONT);

  const dispatch = useDispatch();

  const handleClick = () => sideInOrOut(card);

  const mouseInOut = () => {
    if (card.layout === 'transform') setShowFace(() => showFace === face.FRONT ? face.BACK : face.FRONT);
  }

  const src = parseImgSource(card, showFace);

  const contextMenuItems = [
    { label: `Move to ${card.ms === 'm' ? 'sideboard' : 'maindeck'}`,
      callback: () => sideInOrOut(card) },
    // { label: `// Move all to ${card.ms === 'm' ? 'sideboard' : 'maindeck'}`,
    //   callback: () => null },
    { label: `Add 1`,
      callback: () => dispatch(addCardToMain(card)) },
    { label: `Increase to 4`,
      callback: () => dispatch(incrementMaindeckToX(card, 4)) },
    { label: `Remove 1`,
      callback: () => dispatch(removeCard(card)) },
    { label: `Remove all`,
      callback: () => dispatch(removeAllByNameAndZone(card)) },
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