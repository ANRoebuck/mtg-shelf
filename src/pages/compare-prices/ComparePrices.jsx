import React, { useEffect, useState } from 'react';
import './compare-prices.scss';
import { configureModels } from './models/configureModels';
import SearchResult from './components/SearchResult';
import SellerOption from './components/SellerOption';
import { filterFoilsBy, sortOosBy, sortPriceBy } from './utils/enums';
import SearchOptions from './components/SearchOptions';
import LoadingDoughnut from './components/LoadingDoughnut';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CheckBox from './components/CheckBox';
import {
  addSavedCard,
  getSavedCards,
  removeSavedCard,
  uniqueSavedResultKey
} from './components/localStorageInteractions';
import axios from 'axios';
import { cors } from './utils/utils';
import FAQ from "./components/FAQ";
import AutoSuggestSearchBar from "../../common/AutoSuggestSearchBar";
import { autocomplete } from "../../gateway/http";


const TabPanel = ({children, value, index}) => (
  <div className="tab-panel" hidden={value !== index} data-testid={`tab-panel-${index}`}>
    {children}
  </div>
);

const ComparePrices = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [clearOnSearch, setClearOnSearch] = useState(true);
  const [discoveredPrices, setDiscoveredPrices] = useState([]);
  const [savedPrices, setSavedPrices] = useState([]);
  const [sellers, setSellers] = useState(configureModels());
  const [tab, setTab] = React.useState(0);

  const [sortStock, setSortStock] = useState(sortOosBy.last);
  const [filterFoils, setFilterFoils] = useState(filterFoilsBy.all);
  const [sortPrice, setSortPrice] = useState(sortPriceBy.asc);


  useEffect(() => {
    axios.get(cors).then(console.log("Server OK"));
    setSavedPrices(getSavedCards());
  }, []);

  const onChangeTab = (event, newValue) => setTab(newValue);

  const getUpdatedSuggestions = async (term) => term.length > 1 ? autocomplete(term) : [];

  const onSubmit = async (searchFor) => {
    if (clearOnSearch) setDiscoveredPrices([]);
    setLastSearched(searchFor);
    setSearchTerm('');
    sellers.forEach(seller => {
      seller.enabled && toggleSellerLoading(seller);
      setSellerKeyValue('name', seller.name, 'results', '');
      setSellerKeyValue('name', seller.name, 'inStock', '');
    });
    const enabledSellers = sellers.filter(s => s.enabled);
    enabledSellers.forEach(s => getSearchResultsForSeller(s, searchFor));
  }

  const getSearchResultsForSeller = async (seller, searchFor) => {
    let results = await seller.model.search(searchFor);
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

  const numberLoading = sellers.filter(s => s.loading).length;

  const addDiscoveredPrices = (newDiscoveredPrices) => setDiscoveredPrices((discoveredPrices) =>
    discoveredPrices.concat(newDiscoveredPrices));


  const addSavedPrice = (discoveredPrice) => {
    setSavedPrices(prevState => ({
      ...prevState,
      [uniqueSavedResultKey(discoveredPrice)]: discoveredPrice,
    }));
    addSavedCard(discoveredPrice);
  };

  const removeSavedPrice = (discoveredPrice) => {
    setSavedPrices(prevState => Object.fromEntries(
      Object.entries(prevState)
        .filter(([k, v]) => k !== uniqueSavedResultKey(discoveredPrice))
    ));
    removeSavedCard(discoveredPrice);
  };

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

  const maybeFilterByFoil = (item) => {
    if (filterFoils === filterFoilsBy.foil) return itemIsFoil(item);
    if (filterFoils === filterFoilsBy.nonFoil) return !itemIsFoil(item);
    return true;
  }
  const maybeFilterByStock = (item) => {
    if (sortStock === sortOosBy.exclude) return itemIsOos(item);
    return true;
  }
  const maybeSortByStock = (a, b) => {
    if (sortStock === sortOosBy.last) return sortOutOfStockLast(a, b);
    if (sortStock === sortOosBy.none) return sortNoSort(a, b);
  }

  const sellerIsEnabled = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name)?.enabled;
  const sellerIsFavourite = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name)?.favourite;
  const itemIsOos = (item) => item.stock.value > 0;
  const itemIsFoil = (item) => item.isFoil;

  const sortByPrice = (a, b) => {
    if (sortPrice === sortPriceBy.asc) return a.price.value - b.price.value;
    if (sortPrice === sortPriceBy.dsc) return b.price.value - a.price.value;
    return 0;
  }
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
  const sortNoSort = () => 0;

  const sellerOptions = () => sellers.map(seller => SellerOption(seller, toggleSellerEnabled, assignFavourite));

  const isSaved = (discoveredPrice) => Object.keys(savedPrices).includes(uniqueSavedResultKey(discoveredPrice));

  const mapToSearchResult = (discoveredPrice) =>
    SearchResult(discoveredPrice, isSaved(discoveredPrice), addSavedPrice, removeSavedPrice);

  const searchResults = () => discoveredPrices
    .filter(sellerIsEnabled)
    .filter(maybeFilterByFoil)
    .filter(maybeFilterByStock)
    .sort(sortByPrice)
    .sort(sortFavouriteFirst)
    .sort(maybeSortByStock)
    .map(mapToSearchResult);

  const savedResults = () => Object.values(savedPrices)
    .filter(sellerIsEnabled)
    .filter(maybeFilterByFoil)
    .filter(maybeFilterByStock)
    .sort(sortByPrice)
    .sort(sortFavouriteFirst)
    .sort(maybeSortByStock)
    .map(mapToSearchResult);

  const views = {
    results: 'Results',
    options: 'Options',
    bookmarks: 'Bookmarks',
    // faq: 'FAQ',
  };


  return (
    <div className="compare-prices">

      <div className="compare-prices-menu">

        <AutoSuggestSearchBar placeholderText="Type to search" onSubmit={onSubmit}
                              getUpdateSuggestions={getUpdatedSuggestions}
                              optionalExternallyManagedSearchTerm={searchTerm}
                              optionalSetExternallyManagedSearchTerm={setSearchTerm}>
          <CheckBox option="Clear previous results" checked={clearOnSearch}
                    onChange={() => setClearOnSearch(prevState => !prevState)}/>
        </AutoSuggestSearchBar>

        <LoadingDoughnut loaded={sellers.length - numberLoading} total={sellers.length}/>

      </div>

      <AppBar position="static" >
        <Tabs value={tab} onChange={onChangeTab}>
          {Object.values(views).map(v => <Tab label={v}/>)}
        </Tabs>
      </AppBar>

      <TabPanel value={tab} index={0}>
        <div className="search-results">
          {searchResults()}
          {/*<div className="void-filler" />*/}
        </div>
      </TabPanel>


      <TabPanel value={tab} index={1}>

        <div className="section-heading">Sort and Filter</div>
        <div className="options">
          <SearchOptions title={"Price"} options={Object.values(sortPriceBy)} selectOption={setSortPrice}/>
          <SearchOptions title={"Out of Stock Items"} options={Object.values(sortOosBy)} selectOption={setSortStock}/>
          <SearchOptions title={"Foils"} options={Object.values(filterFoilsBy)} selectOption={setFilterFoils}/>
        </div>

        <div className="section-heading">Sellers</div>
        <div className="sellers">
          {sellerOptions()}
        </div>

      </TabPanel>

      <TabPanel value={tab} index={2}>
        <div className="search-results">
          {savedResults()}
        </div>
      </TabPanel>

      {/*<TabPanel value={tab} index={3}>*/}
      {/*  <FAQ/>*/}
      {/*</TabPanel>*/}

    </div>
  );
};

export default ComparePrices;
