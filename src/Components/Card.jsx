import React from "react";

const Card = ({ card, covered }) => {

  const src = card.image_uris && card.image_uris.small;

  return (
    <div className={`card${covered && ' covered'}`} >
      <img className="card-img" src={src}/>
    </div>
  );
};

export default Card;