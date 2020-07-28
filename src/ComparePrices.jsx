import React, { useState } from "react";
import './compare-prices.scss';
import ModelAxion from "./components/compare-prices/models/model-axion";
import ModelChaosCards from "./components/compare-prices/models/model-chaos-cards";
import ModelMadHouse from "./components/compare-prices/models/model-madhouse";
import ModelPatriotGamesLeeds from "./components/compare-prices/models/model-patriot-games-leeds";
import ModelTrollTrader from "./components/compare-prices/models/model-trolltrader";

const configureModels = () => [
  new ModelMadHouse(),
  new ModelTrollTrader(),
  new ModelPatriotGamesLeeds(),
  new ModelAxion(),
  new ModelChaosCards(),
].map(model => ({name: model.name, logo: model.logo, enabled: true, model}));

const ComparePrices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [discoveredPrices, setDiscoveredPrices] = useState([]);
  const [sellers] = useState(configureModels());

  // const updateSellers = () => setSellers([]);

  const onChange = (event) => setSearchTerm(event.target.value);

  const onSubmit = async (e) => {
    setDiscoveredPrices([]);
    setLastSearched(searchTerm);
    setSearchTerm('');
    e.preventDefault();
    for (const seller of sellers) {
      const results = await seller.model.search(searchTerm);
      addDiscoveredPrices(results);
    }
  }

  const addDiscoveredPrices = (newDiscoveredPrices) =>
    setDiscoveredPrices((discoveredPrices) => discoveredPrices.concat(newDiscoveredPrices));

  const strongMatch = (discoveredPrice) => stripWord(discoveredPrice.title).includes(stripWord(lastSearched));
  const stripWord = (word) => word.split('').filter(l => /\w/.test(l)).join('').toLowerCase();

  const cheapestFirst = (a, b) => a.price.value - b.price.value;
  const outOfStockLast = (a, b) => {
    const stockA = a.stock.value;
    const stockB = b.stock.value;
    if (stockA === 0 && stockB !== 0) return 1;
    if (stockB === 0 && stockA !== 0) return -1;
    return 0;
  }

  const sellerIcons = sellers.map(seller => {
    return (
      <div className="seller">
        <img className="logo" src={seller.logo} alt={seller.name}/>
      </div>
    )
  });

  const searchResults = discoveredPrices
    .filter(discoveredPrice => strongMatch(discoveredPrice))
    .sort(cheapestFirst)
    .sort(outOfStockLast)
    .map(discoveredPrice => {
      const {name, logo, title, price, stock, imgSrc, expansion} = discoveredPrice;
      return (
        <div className="discovered-price" data-in-stock={stock.value > 0}>
          <div className="seller">
            <img className="logo" src={logo} alt={name}/>
          </div>
          <div className="details">
            <div className="name">{title}</div>
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
          <input type="text" value={searchTerm} onChange={(e) => onChange(e)}/>
        </label>
      </form>
      <div className="sellers">
        {sellerIcons}
      </div>
      <div className="search-results">
        {searchResults}
      </div>
    </div>
  );
};

export default ComparePrices;