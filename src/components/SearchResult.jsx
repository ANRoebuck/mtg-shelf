import React from "react";
import { parseImgSource } from "./utils";
import { useDispatch } from "react-redux";
import { addCardToMain } from "../store/deckBuilder-actions";

const SearchResult = ({ card, covered }) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(addCardToMain(card));

  return (
    <div className={`search-result${covered && ' covered'}`} onClick={handleClick}>
      <img className="search-result-img" src={parseImgSource(card)} alt={`search result for ${card.name}`}/>
    </div>
  );
};

export default SearchResult;