import React from 'react';

const ResultsSummary = ({sortedResults}) => {

  const cheapestInStock = sortedResults?.[0]?.stock.value > 0 ? sortedResults[0] : null;

  const resultsByStock = sortedResults.reduce((acc, ele) => {
    if (ele.stock.value) acc.inStock = acc.inStock + 1;
    else acc.outOfStock = +acc.outOfStock + 1;
    return acc;
  }, {inStock: 0, outOfStock: 0});

  return (
    <div className="results-summary">
      <div className="results-summary-section">
        <div className="results-summary-bold">{`${resultsByStock.inStock} results in stock`}</div>
        <div className="results-summary-light">{`(${resultsByStock.outOfStock} out of stock)`}</div>
      </div>
      {cheapestInStock ?
        <div className="results-summary-section">
          <div className="results-summary-bold">{`Cheapest: ${cheapestInStock.price.text}`}</div>
          <div className="results-summary-light">{`(${cheapestInStock.name})`}</div>
        </div> : null }
    </div>
  )

}

export default ResultsSummary;
