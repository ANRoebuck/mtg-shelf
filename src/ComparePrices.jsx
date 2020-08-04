import React, { useState } from "react";
import './compare-prices.scss';
import { configureModels } from "./components/compare-prices/models/configureModels";


const ComparePrices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [discoveredPrices, setDiscoveredPrices] = useState([]);
  const [sellers, setSellers] = useState(configureModels());

  const onChange = (event) => setSearchTerm(event.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    const searchFor = searchTerm;
    setDiscoveredPrices([]);
    setLastSearched(searchTerm);
    setSearchTerm('');
    sellers.forEach(seller => {
      seller.enabled && toggleSellerLoading(seller);
      setSellerKeyValue('name', seller.name, 'results', '');
      setSellerKeyValue('name', seller.name, 'inStock', '');
    });
    for (const seller of sellers) {
      seller.enabled && await getSearchResultsForSeller(seller, searchFor);
    }
  }

  const getSearchResultsForSeller = async (seller, searchFor) => {
    let results = await seller.model.search(searchFor);
    results = results.filter(result => strongMatch(result.title, searchFor));
    addDiscoveredPrices(results);
    toggleSellerLoading(seller);
    setSellerKeyValue('name', seller.name, 'results', results.length);
    setSellerKeyValue('name', seller.name, 'inStock', results.filter(result => result.stock.value > 0).length);
  }

  const catchUpSearchResultsForSeller = async (seller) => {
    if (seller.results === '') {
      !seller.loading && toggleSellerLoading(seller);
      await getSearchResultsForSeller(seller, lastSearched);
    }
  }

  const addDiscoveredPrices = (newDiscoveredPrices) => setDiscoveredPrices((discoveredPrices) =>
    discoveredPrices.concat(newDiscoveredPrices));

  const toggleSellerBoolean = (idKey, idValue, toggleKey) => setSellers((sellers) => sellers.map(seller =>
    seller[idKey] === idValue ? {...seller, [toggleKey]: !seller[toggleKey]} : seller));
  const toggleSellerLoading = (seller) => toggleSellerBoolean('name', seller.name, 'loading');
  const toggleSellerEnabled = async (seller) => {
    const wasEnabled = sellerIsEnabled(seller);
    toggleSellerBoolean('name', seller.name, 'enabled');
    !wasEnabled && await catchUpSearchResultsForSeller(seller);
  }

  const setSellerKeyValue = (idKey, idValue, updateKey, value) => setSellers((sellers) => sellers.map(seller =>
    seller[idKey] === idValue ? {...seller, [updateKey]: value} : seller));

  const strongMatch = (result, searchTerm) => stripWord(result).includes(stripWord(searchTerm));
  const stripWord = (word) => word.split('').filter(l => /\w/.test(l)).join('').toLowerCase();

  const sellerIsEnabled = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name).enabled;

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
        {seller.loading ? <div>Loading...</div> : null}
        <img className="logo" src={seller.logo} alt={seller.name} onClick={() => toggleSellerEnabled(seller)}/>
        <div>{seller.enabled ? 'enabled' : 'disabled'}</div>
        <div>{`results: ${seller.results}`}</div>
        <div>{`inStock: ${seller.inStock}`}</div>
      </div>
    )
  });

  const searchResults = discoveredPrices
    .filter(sellerIsEnabled)
    .sort(cheapestFirst)
    .sort(outOfStockLast)
    .map(discoveredPrice => {
      const {name, logo, title, price, stock, imgSrc, expansion} = discoveredPrice;
      return (
        <div className="discovered-price" data-in-stock={stock.value > 0}>
          <div className="seller">
            <img className="logo" src={logo} alt={name}/>
            {/*<div>{price.value}</div>*/}
            {/*<div>{stock.value}</div>*/}
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