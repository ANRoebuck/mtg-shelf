import React, { useState } from "react";
import './compare-prices.scss';
import { configureModels } from "./components/compare-prices/models/configureModels";
import SearchResult from "./components/compare-prices/SearchResult";
import Seller from "./components/compare-prices/Seller";

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

  const selectFavourite = (name) => {
    sellers.forEach(seller => setSellerKeyValue('name', seller.name, 'favourite', false));
    setSellerKeyValue('name', name, 'favourite', true);
  }

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

  const sellerIcons = sellers.map(seller => Seller(seller, toggleSellerEnabled, selectFavourite));

  const searchResults = discoveredPrices
    .filter(sellerIsEnabled)
    .sort(cheapestFirst)
    .sort(outOfStockLast)
    .map(discoveredPrice => SearchResult(discoveredPrice));

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