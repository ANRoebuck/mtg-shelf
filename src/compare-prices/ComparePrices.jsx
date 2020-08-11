import React, { useState } from "react";
import './compare-prices.scss';
import { configureModels } from "./models/configureModels";
import SearchResult from "./components/SearchResult";
import SellerOption from "./components/SellerOption";
import { sortOosBy } from "./enums";
import SearchOptions from "./components/SearchOptions";

const ComparePrices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [discoveredPrices, setDiscoveredPrices] = useState([]);
  const [sellers, setSellers] = useState(configureModels());
  const [sortStockBy, setSortStockBy] = useState(sortOosBy.last);

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

  const assignFavourite = (seller) => {
    if (sellerIsFavourite(seller)) setSellerKeyValue('name', seller.name, 'favourite', false);
    else {
      sellers.forEach(seller => setSellerKeyValue('name', seller.name, 'favourite', false));
      setSellerKeyValue('name', seller.name, 'favourite', true);
    }
  }

  const strongMatch = (result, searchTerm) => stripWord(result).includes(stripWord(searchTerm));
  const stripWord = (word) => word.split('').filter(l => /\w/.test(l)).join('').toLowerCase();

  const maybeFilterByStock = (item) => {
    if (sortStockBy === sortOosBy.exclude) return itemIsOos(item);
    return true;
  }
  const maybeSortByStock = (a, b) => {
    if (sortStockBy === sortOosBy.last) return sortOutOfStockLast(a, b);
    if (sortStockBy === sortOosBy.none) return sortNoSort(a, b);
  }

  const sellerIsEnabled = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name).enabled;
  const sellerIsFavourite = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name).favourite;
  const itemIsOos = (item) => item.stock.value > 0;

  const sortCheapestFirst = (a, b) => a.price.value - b.price.value;
  const sortNoSort = () => 0;
  const sortOutOfStockLast = (a, b) => {
    const stockA = a.stock.value;
    const stockB = b.stock.value;
    if (stockA === 0 && stockB !== 0) return 1;
    if (stockB === 0 && stockA !== 0) return -1;
    return 0;
  }
  const sortFavouriteFirst = (a, b) => {
    if (a.name === b.name) return 0;
    else if (sellerIsFavourite(a)) return -1;
    else if (sellerIsFavourite(b)) return 1;
    return 0;
  }

  const sellerOptions = sellers.map(seller => SellerOption(seller, toggleSellerEnabled, assignFavourite));

  const searchResults = discoveredPrices
    .filter(sellerIsEnabled)
    .filter(maybeFilterByStock)
    .sort(sortCheapestFirst)
    .sort(maybeSortByStock)
    .sort(sortFavouriteFirst)
    .map(SearchResult);

  return (
    <div className="card-search">
      <form onSubmit={(e) => onSubmit(e)}>
        <label>
          Card Search:
          <input type="text" value={searchTerm} onChange={(e) => onChange(e)}/>
        </label>
      </form>
      <div className="options">
        <SearchOptions stockOptions={Object.values(sortOosBy)} setSortStockBy={setSortStockBy}/>
      </div>
      <div className="sellers">
        {sellerOptions}
      </div>
      <div className="search-results">
        {searchResults}
      </div>
    </div>
  );
};

export default ComparePrices;