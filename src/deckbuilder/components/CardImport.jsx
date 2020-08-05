import React, { useState } from 'react';
import { addSomeToSomewhere, where } from "../../store/deckBuilder-actions";
import { searchCards } from '../../gateway/http';
import { useDispatch } from "react-redux";

const CardSearch = () => {

  const [list, setList] = useState('');
  const dispatch = useDispatch();

  const onChange = (event) => setList(event.target.value);

  const doThingForList = () => arraysFromList(list)
    .forEach((sublist, i) => sublist
      .forEach(subListItem =>
        getCard(subListItem.cardName)
          .then(card => dispatch(addSomeToSomewhere(exactMatch(card, subListItem.cardName), subListItem.qty, where(i))))
          .catch(e => errorHandle(e, subListItem))));

  const arraysFromList = (l) => l
    .split(/sideboard/i)
    .map(subList =>
      subList
        .split('\n')
        .map(item => ({qty: getQty(item), cardName: getCardName(item)}))
    );

  const getQty = (item) => item.replace(/(\d*)\s*x*\s*(\S[\s\S]*)/, `$1`);

  const getCardName = (item) => item.replace(/(\d*)\s*x*\s*(\S[\s\S]*)/, `$2`);

  const exactMatch = (cardArray, cardName) => (cardArray.filter(c => c.name.toLowerCase() === cardName.toLowerCase())[0]);

  const getCard = (cardName) => searchCards(cardName);

  const errorHandle = (e, listItem) => 'nborked';

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

export default CardSearch;