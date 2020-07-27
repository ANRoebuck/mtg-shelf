import React, { useState } from "react";
import './compare-prices.scss';
import ModelAxion from "./components/compare-prices/model-axion";
import ModelChaosCards from "./components/compare-prices/model-chaos-cards";
import ModelMadHouse from "./components/compare-prices/model-madhouse";
// import ModelPatriotGamesLeeds from "./components/compare-prices/model-patriot-games-leeds";
import ModelTrollTrader from "./components/compare-prices/model-trolltrader";

const ComparePrices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [discoveredPrices, setDiscoveredPrices] = useState([]);
  const models = [
    new ModelMadHouse(),
    new ModelTrollTrader(),
    // new ModelPatriotGamesLeeds(),
    new ModelAxion(),
    new ModelChaosCards(),
  ];
  const onChange = (event) => setSearchTerm(event.target.value);

  const onSubmit = async (e) => {
    setDiscoveredPrices([]);
    setLastSearched(searchTerm);
    setSearchTerm('');
    e.preventDefault();
    for (const model of models) {
      const results = await model.search(searchTerm);
      addDiscoveredPrices(results);
    }
  }

  const addDiscoveredPrices = (newDiscoveredPrices) =>
    setDiscoveredPrices((discoveredPrices) => discoveredPrices.concat(newDiscoveredPrices));

  const strongMatch = (discoveredPrice) => stripWord(discoveredPrice.name).includes(stripWord(lastSearched));
  const stripWord = (word) => word.split('').filter(l => /\w/.test(l)).join('').toLowerCase();

  const cheapestFirst = (a, b) => a.price.value - b.price.value;
  const outOfStockLast = (a, b) => {
    const stockA = a.stock.value;
    const stockB = b.stock.value;
    if (stockA === 0 && stockB !== 0) return 1;
    if (stockB === 0 && stockA !== 0) return -1;
    return 0;
  }

  const searchResults = discoveredPrices
    .filter(discoveredPrice => strongMatch(discoveredPrice))
    .sort(cheapestFirst)
    .sort(outOfStockLast)
    .map(discoveredPrice => {
    const { seller, name, price, stock, imgSrc, expansion } = discoveredPrice;
    return (
      <div className="discovered-price" data-in-stock={stock.value > 0}>
        <div className="seller">
          <div>{seller}</div>
        </div>
        <div className="details">
          <div className="name">{name}</div>
          <div className="expansion">{expansion}</div>
        </div>
        <div className="stock">
          <div>{stock.text}</div>
        </div>
        <div className="price">
          <div>{price.text}</div>
        </div>
        <div className="img-container">
          <img className="discovered-price-img" src={imgSrc} alt={name}/>
        </div>
      </div>
    )
  });

  return (
  <div className="card-search">
    <form onSubmit={(e) => onSubmit(e)}>
      <label>
        Card Search:
        <input type="text" value={searchTerm} onChange={(e) => onChange(e)} />
      </label>
    </form>
    <div className="search-results">
      {searchResults}
    </div>
  </div>
  );
};

export default ComparePrices;