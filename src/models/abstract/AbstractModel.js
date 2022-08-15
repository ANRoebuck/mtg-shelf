import { removeDiacritics } from '../../utils/utils';
import { getCachedResultsForSearch, setCachedResultsForSearch } from '../../gateway/localStorageInteractions';

// for use during local testing/development
const logData = false;
const logResults = false;
const logResults_withoutLogo = false;
const useCachedResults = false;

class AbstractModel {

  constructor({ name, logo, dataGetter, processorSelector }) {
    this.name = name;
    this.logo = logo;
    this.dataGetter = dataGetter;
    this.processorSelector = processorSelector;
  }

  search = async (input) => {

    const sanitisedSearchTerm = removeDiacritics(input);

    const cachedResults = useCachedResults ? this.readCachedResults(this.name, sanitisedSearchTerm) : null;
    if (cachedResults) return cachedResults;

    const rawData = await this.dataGetter.getData(sanitisedSearchTerm);
    if (logData) console.log(rawData);

    const processor = this.processorSelector.getProcessor(rawData, sanitisedSearchTerm);

    const foundItems = await processor.processData(rawData);

    const filteredItems = [...foundItems]
      .filter(result => this.strongMatch(result.title, sanitisedSearchTerm))
      .filter(result => this.excludeArtCard(result.title))
      .map(result => ({ ...result, name: this.name, logo: this.logo }));

    if (useCachedResults) this.cacheResults(this.name, sanitisedSearchTerm, filteredItems);

    if (logResults) console.log(filteredItems);
    // logs found items minus their logo, as it's gibberish and unhelpful
    if (logResults_withoutLogo) console.log(filteredItems.map(item => ({...item, logo: 'a logo'})));

    return filteredItems;
  }


  // result filtering
  stripWord = (word) => word.split('').filter(l => /\w/.test(l)).join('').toLowerCase();
  strongMatch = (title, searchTerm) => this.stripWord(removeDiacritics(title)).includes(this.stripWord(searchTerm));
  excludeArtCard = (title) => {
    const strippedTitle = this.stripWord(title);
    return !(strippedTitle.includes('artcard') || strippedTitle.includes('artseries') || title.includes('(Art)'));
  }


  // local storage methods
  readCachedResults = (sellerName, searchTerm) => getCachedResultsForSearch(sellerName, searchTerm);
  cacheResults = (sellerName, searchTerm, results) => setCachedResultsForSearch(sellerName, searchTerm, results);

}

export default AbstractModel;
