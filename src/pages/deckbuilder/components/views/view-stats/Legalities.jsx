import React from "react";
import { useSelector } from "react-redux";
import { selectDecklist } from "../../../../../store/deckBuilder-selector";
import { legalityByFormat } from "../../../utils/utils";

const Legalities = () => {

  const maindeck = useSelector(selectDecklist);
  const legalities = legalityByFormat(maindeck);

  const formats =
    ['standard', 'historic', 'pioneer', 'modern', 'legacy', 'vintage', 'oldschool', 'commander', 'pauper'];

  const display = formats.map(format => {
    return (<div>
      {format} : {legalities[format] ? 'legal' : 'X'}
    </div>)
  })

  return (
    <div className="single-stat">
      <div>FORMAT LEGALITIES</div>
      {display}
    </div>
  );
};

export default Legalities;
