import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cors } from './utils/utils';
import { filterFoilsOptions, sortPriceOptions } from './utils/enums';
import { configureSellers } from './utils/sellers';
import { addSavedCard, getSavedCards, removeSavedCard, uniqueSavedResultKey } from './gateway/localStorageInteractions';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AutoSuggestSearchBar from './components/AutoSuggestSearchBar';
import CheckBox from './components/CheckBox';
import FAQ from './components/FAQ';
import LoadingDoughnut from './components/LoadingDoughnut';
import ResultsBySeller from './components/ResultsBySeller';
import ResultsSummary from './components/ResultsSummary';
import SearchResult from './components/SearchResult';
import SellerOption from './components/SellerOption';
import SearchOptions from './components/SearchOptions';
import './compare-prices.scss';


const TabPanel = ({children, value, index}) => (
  <div className="tab-panel" hidden={value !== index} data-testid={`tab-panel-${index}`}>
    {children}
  </div>
);

// const mkm = configureModel(new Model_MKM());
const allSellers = configureSellers();

const ComparePrices = () => {

  const [sellers, setSellers] = useState(allSellers);
  const [discoveredPrices, setDiscoveredPrices] = useState([]);
  const [savedPrices, setSavedPrices] = useState({});

  const [tab, setTab] = useState(0);
  const onChangeTab = (event, newValue) => setTab(newValue);

  const [filterFoils, setFilterFoils] = useState(filterFoilsOptions.all);
  const [sortPrice, setSortPrice] = useState(sortPriceOptions.asc);


  useEffect(() => {
    axios.get(cors).then(console.log("Server OK"));
    setSavedPrices(getSavedCards());
  }, []);




  // Searching and handling results

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

  const setSellerEnabled = (seller, isEnabled) => setSellerKeyValue('name', seller.name, 'enabled', isEnabled);

  const assignFavourite = (seller) => {
    if (sellerIsFavourite(seller)) setSellerKeyValue('name', seller.name, 'favourite', false);
    else {
      sellers.forEach(seller => setSellerKeyValue('name', seller.name, 'favourite', false));
      setSellerKeyValue('name', seller.name, 'favourite', true);
    }
  }



  //  Sort and Filter methods

  const maybeFilterByFoil = (item) => {
    if (filterFoils === filterFoilsOptions.foil) return itemIsFoil(item);
    if (filterFoils === filterFoilsOptions.nonFoil) return !itemIsFoil(item);
    return true;
  }

  const sellerIsEnabled = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name)?.enabled;
  const sellerIsFavourite = (targetSeller) => sellers.find(seller => seller.name === targetSeller.name)?.favourite;
  const itemIsFoil = (item) => item.isFoil;

  const sortPriceAscending = (a, b) => a.price.value - b.price.value;
  const sortPriceDescending = (a, b) => b.price.value - a.price.value;
  const sortByPrice = (a, b) => {
    if (sortPrice === sortPriceOptions.asc) return sortPriceAscending(a, b);
    if (sortPrice === sortPriceOptions.dsc) return sortPriceDescending(a, b);
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
    .sort(sortByPrice)
    .sort(sortFavouriteFirst)
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
        <AutoSuggestSearchBar placeholderText="Type to search" >
        </AutoSuggestSearchBar>

        {finishedLoading ?
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
        {/*  {lastSearched && <MkmSummary mkmLoading={mkmLoading} mkmResults={discoveredMKM}/>}*/}
        {/*</div>*/}
        <div className="search-results">
          {searchResults()}
        </div>
      </TabPanel>


      <TabPanel value={tab} index={1}>

        <div className="section-heading">Sort and Filter</div>
        <div className="options">
          <SearchOptions title={"Price"} options={Object.values(sortPriceOptions)} selectOption={setSortPrice} localStorageKey={"sort-option-price"}/>
          <SearchOptions title={"Foils"} options={Object.values(filterFoilsOptions)} selectOption={setFilterFoils} localStorageKey={"sort-option-foil"}/>
          {/*<SearchOptions title={"Out of Stock"} options={Object.values(sortOosBy)} selectOption={setSortStock} localStorageKey={"sort-option-stock"}/>*/}
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
