import { getCachedResultsForSearch, setCachedResultsForSearch } from '../components/localStorageInteractions';


class AbstractModel {

  constructor() {
    this.parser = new DOMParser();
  }

  readCachedResults = (sellerName, searchTerm,) => getCachedResultsForSearch(sellerName, searchTerm);

  cacheResults = (sellerName, searchTerm, results) => setCachedResultsForSearch(sellerName, searchTerm, results);

}

export default AbstractModel;
