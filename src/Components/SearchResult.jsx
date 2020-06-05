import React from "react";

const SearchResult = ({ card, addCard, covered }) => {

  const onClick = () => addCard(card);

  const src = card.image_uris && card.image_uris.small;

  return (
    <div className={`search-result${covered && ' covered'}`} onClick={onClick}>
      <img className="search-result-img" src={src}/>
    </div>
  );
};

export default SearchResult;