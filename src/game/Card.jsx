import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { face } from "../deckbuilder/utils/enums";
import { parseImgSource } from "../deckbuilder/utils/utils";

const Card = ({card, onDragStart, originArea}) => {

  // const [ref, updateRef] = useRefCreator();
  const [showFace, setShowFace] = useState(face.FRONT);
  const [tapped, setTapped] = useState(false);

  // const mouseInOut = () => {
  //   if (card.layout === 'transform') setShowFace(() => showFace === face.FRONT ? face.BACK : face.FRONT);
  // }

  const src = parseImgSource(card, showFace);

  const handleClick = () => originArea === 'battlefield' ? setTapped(tapped => !tapped) : null;

  return (
    // <div className={`card${covered ? ' covered' : ''} index=${card.index}`} ref={updateRef} >
    <div className="card"
         draggable={true}
         onDragStart={(e) => onDragStart(e, card, originArea)}
         onClick={handleClick}
    >
      <img
        className="card-img"
        src={src}
        alt={`${card.name}`}
        data-tapped={tapped}
      />
    </div>
  );
};

export default Card;