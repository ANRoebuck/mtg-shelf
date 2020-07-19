import React, { useState } from "react";
import ModelMadHouse from "./components/compare-prices/model-madhouse";
import ModelTrollTrader from "./components/compare-prices/model-trolltrader";
import './compare-prices.scss';
import ModelAxion from "./components/compare-prices/model-axion";
// import ModelPatriotGamesLeeds from "./components/compare-prices/model-patriot-games-leeds";

const ComparePrices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [discoveredPrices, setDiscoveredPrices] = useState([]);
  const models = [
    new ModelMadHouse(),
    new ModelTrollTrader(),
    // new ModelPatriotGamesLeeds(),
    new ModelAxion()
  ];
  const onChange = (event) => setSearchTerm(event.target.value);

  const onSubmit = async (e) => {
    setDiscoveredPrices([]);
    setLastSearched(searchTerm);
    setSearchTerm('');
    e.preventDefault();
    for (const model of models) {
      const results = await model.search(searchTerm);
      console.log(results);
      addDiscoveredPrices(results);
    }
  }

  const addDiscoveredPrices = (newDiscoveredPrices) =>
    setDiscoveredPrices((discoveredPrices) => discoveredPrices.concat(newDiscoveredPrices));

  const strongMatch = (discoveredPrice) => stripWord(discoveredPrice.name).includes(stripWord(lastSearched));
  const stripWord = (word) => word.split('').filter(l => /\w/.test(l)).join('').toLowerCase();

  const searchResults = discoveredPrices
    .filter(discoveredPrice => strongMatch(discoveredPrice))
    .map(discoveredPrice => {
    const { seller, name, price, stock, imgSrc, expansion } = discoveredPrice;
    return (
      <div className="discovered-price">
        <div className="seller">{seller}</div>
        <div className="details">
          <div className="name">{name}</div>
          <div className="expansion">{expansion}</div>
        </div>
        <div className="stock">{stock}</div>
        <div className="price">{price}</div>
        <img className="discovered-price-img" src={imgSrc} alt={name}/>
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