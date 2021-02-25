import React, { useState } from 'react';
import { addSomeToSomewhere, where } from "../../../store/deckBuilder-actions";
import { searchCards } from '../../../gateway/http';
import { useDispatch } from "react-redux";
import { isTransformCard } from "../utils/utils";
import './cardimport.scss';

const CardImport = () => {

  const [list, setList] = useState('');
  const dispatch = useDispatch();

  const onChange = (event) => setList(event.target.value);

  const doThingForList = () => arraysFromList(list)
    .forEach((sublist, i) => sublist
      .forEach(subListItem =>
        getCard(subListItem.cardName)
          .then(card => {
            dispatch(addSomeToSomewhere(card, subListItem.qty, where(i)));
            removeItemFromList(subListItem);
          })
          .catch(e => console.log(`Could not add cards: ${subListItem}\n${e}`))
      ));

  const removeItemFromList = (itemToRemove) => setList(list => list
    .split('\n')
    .filter(ele => !(ele.startsWith(itemToRemove.qty) && ele.endsWith(itemToRemove.cardName)))
    .join('\n'))

  const arraysFromList = (l) => l
    .split(/sideboard/i)
    .map(subList => subList
      .split('\n')
      .map(item => ({qty: getQty(item), cardName: getCardNameFromList(item)})));

  const getQty = (item) => item.replace(/(\d*)\s*x*\s*(\S[\s\S]*)/, `$1`);

  const getCardNameFromList = (item) => item.replace(/(\d*)\s*x*\s*(\S[\s\S]*)/, `$2`);

  const firstInclusiveMatch = (cardArray, cardName) => cardArray
    .find(c => cardName.toLowerCase().includes(getCardNameFromResult(c).toLowerCase()));

  const getCardNameFromResult = (card) => isTransformCard(card) ? card.card_faces[0].name : card.name;

  const getCard = (cardName) => searchCards(cardName).then(cards => firstInclusiveMatch(cards, cardName));

  return (
    <div className="card-import">
      <div className="label">
        Card Import:
      </div>
      <textarea className="import-box" value={list} onChange={(e) => onChange(e)}/>
      <button className="button" type="button" onClick={doThingForList}>Import</button>
    </div>
  )
}

export default CardImport;
