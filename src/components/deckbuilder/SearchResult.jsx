import React from "react";
import { parseImgSource } from "./utils";
import { useDispatch } from "react-redux";
import { addCardToMain, incrementMaindeckToX } from "../../store/deckBuilder-actions";
import useRefCreator from "./useRefCreator";
import ContextMenu from "./ContextMenu";

const SearchResult = ({ card, covered }) => {

  const [ref, updateRef] = useRefCreator();
  const dispatch = useDispatch();

  const handleClick = () => dispatch(addCardToMain(card));

  const contextMenuItems = [
    { label: `Add 1`,
      callback: () => dispatch(addCardToMain(card)) },
    { label: `Increase to 4`,
      callback: () => dispatch(incrementMaindeckToX(card, 4)) },
  ];

  return (
    <div className={`search-result${covered && ' covered'}`} ref={updateRef} >
      <ContextMenu containerRef={ref} menuItems={contextMenuItems}/>
      <img className="search-result-img" src={parseImgSource(card)} alt={`search result for ${card.name}`} onClick={handleClick} />
    </div>
  );
};

export default SearchResult;