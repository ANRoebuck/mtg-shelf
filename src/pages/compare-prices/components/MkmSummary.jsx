import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const MkmSummary = ({ mkmLoading, mkmResults }) => {

  const toRender = mkmLoading
    ? <div>Loading...</div>
    : mkmResults.map(r => anMkmResult(r));

  return (
    <div className="mkm-summary">
      {toRender}
    </div>
  )

}

const anMkmResult = (result) => {
  const { title, from, trend, expansion, symbol, imgSrc } = result;

  return (
    <>
      <div>{`Name = ${title}`}</div>
      <div>{`From = ${from.text}`}</div>
      <div>{`Trend = ${trend.text}`}</div>
      <div>{`Expansion = ${expansion}`}</div>
    </>
  );

}

export default MkmSummary;
