import React from "react";
import { parseImgSource } from "./utils";

const SearchResult = ({ card, addCard, covered }) => {

  const onClick = () => addCard(card);

  return (
    <div className={`search-result${covered && ' covered'}`} onClick={onClick}>
      <img className="search-result-img" src={parseImgSource(card)}/>
    </div>
  );
};

export default SearchResult;