import React from "react";

const SearchResult = ({ card }) => {
  return (
    <div className="search-result">
      <div>{card.name}</div>
      <img src={card.image_uris.small}/>
    </div>
  );
};

export default SearchResult;