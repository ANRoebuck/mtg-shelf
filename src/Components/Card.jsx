import React, { useState } from "react";
import { parseImgSource } from "./utils";
import { face } from "./enums";
import useRefCreator from "./useRefCreator";
import ContextMenu from "./ContextMenu";

const Card = ({card, covered, sideInOrOut, removeCard, index}) => {
  const [ref, updateRef] = useRefCreator();
  const [showFace, setShowFace] = useState(face.FRONT);

  const handleClick = () => sideInOrOut(card);

  const mouseInOut = () => {
    if (card.layout === 'transform') setShowFace(() => showFace === face.FRONT ? face.BACK : face.FRONT);
  }

  const src = parseImgSource(card, showFace);

  // const callback = () => console.log('callback');

  const contextMenuItems = [
    {
      label: `Remove ${card.name} from deck`,
      callback: () => removeCard(card)
    },
    // {
    //   label: 'item2',
    //   callback
    // }
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
        // onDoubleClick={handleDoubleClick}
      />
    </div>
  );
};

export default Card;