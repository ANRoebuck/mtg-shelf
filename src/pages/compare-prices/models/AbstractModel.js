import { getCachedResultsForSearch, setCachedResultsForSearch } from '../components/localStorageInteractions';


class AbstractModel {

  constructor({ name, logo, baseUrl, searchPath, searchSuffix }) {
    this.parser = new DOMParser();
    this.name = name;
    this.logo = logo;
    this.baseUrl = baseUrl;
    this.searchPath = searchPath;
    this.searchSuffix = searchSuffix;
  }

  readCachedResults = (sellerName, searchTerm) => getCachedResultsForSearch(sellerName, searchTerm);

  cacheResults = (sellerName, searchTerm, results) => setCachedResultsForSearch(sellerName, searchTerm, results);

  isFoilFromTitle = (title) => title.toLowerCase().includes('foil');

}

export default AbstractModel;
