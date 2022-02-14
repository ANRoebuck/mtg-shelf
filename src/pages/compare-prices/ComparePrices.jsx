import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cors } from './utils/utils';
import { filterFoilsBy, sortOosBy, sortPriceBy } from './utils/enums';
import { autocomplete } from '../../gateway/http';
import { configureModels } from './models/configureModels';
import {
  addSavedCard,
  getSavedCards,
  removeSavedCard,
  uniqueSavedResultKey
} from './components/localStorageInteractions';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AutoSuggestSearchBar from '../../common/AutoSuggestSearchBar';
import CheckBox from './components/CheckBox';
import FAQ from './components/FAQ';
import LoadingDoughnut from './components/LoadingDoughnut';
import ResultsBySeller from './components/ResultsBySeller';
import ResultsSummary from './components/ResultsSummary';
import SearchResult from './components/SearchResult';
import SellerOption from './components/SellerOption';
import SearchOptions from './components/SearchOptions';
import './compare-prices.scss';
import Model_MKM from "./models/Model_MKM";
import MkmSummary from "./components/MkmSummary";


const TabPanel = ({children, value, index}) => (
  <div className="tab-panel" hidden={value !== index} data-testid={`tab-panel-${index}`}>
    {children}
  </div>
);

// const mkm = new Model_MKM();

const ComparePrices = () => {

  const [sellers, setSellers] = useState(configureModels());
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [clearOnSearch, setClearOnSearch] = useState(true);
  const [discoveredPrices, setDiscoveredPrices] = useState([]);
  const [savedPrices, setSavedPrices] = useState({});

  const [mkmLoading, setMkmLoading] = useState(false);
  const [discoveredMKM, setDiscoverdMKM] = useState([]);

  const [tab, setTab] = useState(0);
  const onChangeTab = (event, newValue) => setTab(newValue);

  const [sortStock, setSortStock] = useState(sortOosBy.last);
  const [filterFoils, setFilterFoils] = useState(filterFoilsBy.all);
  const [sortPrice, setSortPrice] = useState(sortPriceBy.asc);


  useEffect(() => {
    axios.get(cors).then(console.log("Server OK"));
    setSavedPrices(getSavedCards());
  }, []);




  // Searching and handling results

  const getUpdatedSuggestions = async (term) => term.length > 2 ? autocomplete(term) : [];

  const onSubmit = async (searchFor) => {
    if (clearOnSearch) setDiscoveredPrices([]);
    setLastSearched(searchFor);
    setSearchTerm('');
    // let mkm = await getMkmSummary(searchFor);
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

  // const getMkmSummary = async (searchFor) => {
  //   setMkmLoading(true);
  //   let results = await mkm.model.search(searchFor);
  //   setDiscoverdMKM(results);
  //   setMkmLoading(false);
  // }

  const catchUpSearchResultsForSeller = async (seller) => {
    if (lastSearched.length > 0 && seller.results === '') {
      !seller.loading && toggleSellerLoading(seller);
      await getSearchResultsForSeller(seller, lastSearched);
    }
  }

  const addDiscoveredPrices = (newDiscoveredPrices) =>
    setDiscoveredPrices((discoveredPrices) => discoveredPrices.concat(newDiscoveredPrices));

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



  // Seller options: dis/enable and un/favourite

  const setSellerKeyValue = (idKey, idValue, updateKey, value) => setSellers((sellers) =>
    sellers.map(seller => seller[idKey] === idValue ? {...seller, [updateKey]: value} : seller));
  const toggleSellerBoolean = (idKey, idValue, toggleKey) => setSellers((sellers) =>
    sellers.map(seller => seller[idKey] === idValue ? {...seller, [toggleKey]: !seller[toggleKey]} : seller));

  const toggleSellerLoading = (seller) => toggleSellerBoolean('name', seller.name, 'loading');

  const setSellerEnabled = (seller, isEnabled) => {
    setSellerKeyValue('name', seller.name, 'enabled', isEnabled);
    isEnabled && catchUpSearchResultsForSeller(seller);
  }

  const assignFavourite = (seller) => {
    if (sellerIsFavourite(seller)) setSellerKeyValue('name', seller.name, 'favourite', false);
    else {
      sellers.forEach(seller => setSellerKeyValue('name', seller.name, 'favourite', false));
      setSellerKeyValue('name', seller.name, 'favourite', true);
    }
  }



  //  Sort and Filter methods

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
    return 0;
  }

  const sellerIsEnabled = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name)?.enabled;
  const sellerIsFavourite = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name)?.favourite;
  const itemIsOos = (item) => item.stock.value > 0;
  const itemIsFoil = (item) => item.isFoil;

  const sortPriceAscending = (a, b) => a.price.value - b.price.value;
  const sortPriceDescending = (a, b) => b.price.value - a.price.value;
  const sortByPrice = (a, b) => {
    if (sortPrice === sortPriceBy.asc) return sortPriceAscending(a, b);
    if (sortPrice === sortPriceBy.dsc) return sortPriceDescending(a, b);
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
  const sortBySeller = (a, b) => a.name.localeCompare(b.name);



  // Rendering

  const sellerOptions = () => sellers.map(seller => SellerOption(seller, setSellerEnabled, assignFavourite));

  const isSaved = (discoveredPrice) => Object.keys(savedPrices).includes(uniqueSavedResultKey(discoveredPrice));

  const toSearchResult = (discoveredPrice) =>
    SearchResult(discoveredPrice, isSaved(discoveredPrice), addSavedPrice, removeSavedPrice);

  const searchResults = () => discoveredPrices
    .filter(sellerIsEnabled)
    .filter(maybeFilterByFoil)
    .filter(maybeFilterByStock)
    .sort(sortByPrice)
    .sort(sortFavouriteFirst)
    .sort(maybeSortByStock)
    .map(toSearchResult);

  const savedResults = () => Object.values(savedPrices)
    .sort(sortByPrice)
    .sort(sortBySeller)
    .map(toSearchResult);

  const views = {
    results: 'Results',
    options: 'Options',
    bookmarks: 'Bookmarks',
    faq: 'FAQ',
  };

  const numberEnabled = sellers.filter(s => s.enabled).length;
  const numberLoading = sellers.filter(s => s.loading).length;
  const finishedLoading = numberLoading === 0;


  return (
    <div className="compare-prices">

      <div className="compare-prices-menu">
        <AutoSuggestSearchBar placeholderText="Type to search" onSubmit={onSubmit}
                              getUpdateSuggestions={getUpdatedSuggestions}
                              optionalExternallyManagedSearchTerm={searchTerm}
                              optionalSetExternallyManagedSearchTerm={setSearchTerm}>
          {/*<CheckBox option="Clear previous results" checked={clearOnSearch}*/}
          {/*          onChange={() => setClearOnSearch(prevState => !prevState)}/>*/}
        </AutoSuggestSearchBar>

        {finishedLoading && lastSearched ?
          <ResultsSummary sortedResults={discoveredPrices.sort(sortPriceAscending).sort(sortOutOfStockLast)} />
        : <LoadingDoughnut loaded={numberEnabled - numberLoading} total={numberEnabled}/>}
      </div>


      <AppBar position="static" >
        <Tabs value={tab} onChange={onChangeTab}>
          {Object.values(views).map(v => <Tab label={v}/>)}
        </Tabs>
      </AppBar>


      <TabPanel value={tab} index={0}>
        {/*<div className="mkm-container">*/}
        {/*  <MkmSummary mkmLoading={mkmLoading} mkmResults={discoveredMKM}/>*/}
        {/*</div>*/}
        <div className="search-results">
          {searchResults()}
        </div>
      </TabPanel>


      <TabPanel value={tab} index={1}>

        <div className="section-heading">Sort and Filter</div>
        <div className="options">
          <SearchOptions title={"Price"} options={Object.values(sortPriceBy)} selectOption={setSortPrice} localStorageKey={"sort-option-price"}/>
          <SearchOptions title={"Out of Stock"} options={Object.values(sortOosBy)} selectOption={setSortStock} localStorageKey={"sort-option-stock"}/>
          <SearchOptions title={"Foils"} options={Object.values(filterFoilsBy)} selectOption={setFilterFoils} localStorageKey={"sort-option-foil"}/>
        </div>

        <div className="section-heading">Sellers</div>
        <div className="sellers">
          {sellerOptions()}
        </div>

      </TabPanel>


      <TabPanel value={tab} index={2}>
        <div className="search-results">
          <ResultsBySeller results={Object.values(savedPrices)}/>
          {savedResults()}
        </div>
      </TabPanel>


      <TabPanel value={tab} index={3}>
        <FAQ/>
      </TabPanel>


    </div>
  );
};

export default ComparePrices;
