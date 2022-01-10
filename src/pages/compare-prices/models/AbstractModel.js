import axios from 'axios';
import { cors, regex, removeDiacritics } from '../utils/utils';
import { getCachedResultsForSearch, setCachedResultsForSearch } from '../components/localStorageInteractions';

// for use during local testing/development
const logHtml = false;
const logResults = false;
const logResults_withoutLogo = false;
const useCachedResults = false;

class AbstractModel {

  constructor({ name, logo, baseUrl, searchPath, searchSuffix, searchJoin, resultSelector, nameSelector,
                priceSelector, priceToDisplayFromPriceText, priceValueFromPriceText,
                stockSelector, stockValueFromStockText, isFoilSelector, imgSelector, imgBaseUrl, imgSrcAttribute,
                productSelector, productBaseUrl, productRefAttribute, expansionSelector,}) {
    this.parser = new DOMParser();
    this.name = name;
    this.logo = logo;
    this.baseUrl = baseUrl;
    this.searchPath = searchPath;
    this.searchSuffix = searchSuffix;
    this.searchJoin = searchJoin;
    this.resultSelector = resultSelector;
    this.nameSelector = nameSelector;
    this.priceSelector = priceSelector;
    this.priceToDisplayFromPriceText = priceToDisplayFromPriceText;
    this.priceValueFromPriceText = priceValueFromPriceText;
    this.stockSelector = stockSelector;
    this.stockValueFromStockText = stockValueFromStockText;
    this.isFoilSelector = isFoilSelector;
    this.imgSelector = imgSelector;
    this.imgBaseUrl = imgBaseUrl;
    this.imgSrcAttribute = imgSrcAttribute;
    this.productSelector = productSelector;
    this.productBaseUrl = productBaseUrl;
    this.productRefAttribute = productRefAttribute;
    this.expansionSelector = expansionSelector;
  }

  search = async (input) => {

    const sanitisedSearchTerm = removeDiacritics(input);

    let cachedResults = useCachedResults ? this.readCachedResults(this.name, sanitisedSearchTerm) : null;
    if (cachedResults) return cachedResults;

    let foundItems = [];
    const resultNodes = await this.allResults(sanitisedSearchTerm);

    resultNodes.forEach(resultNode => {
      foundItems.push({
        name: this.name,
        logo: this.logo,
        title: this.titleFromResultNode(resultNode),
        price: this.priceFromResultNode(resultNode),
        stock: this.stockFromResultNode(resultNode),
        imgSrc: this.imgSrcFromResultNode(resultNode),
        productRef: this.productRefFromResultNode(resultNode),
        expansion: this.expansionFromResultNode(resultNode),
        isFoil: this.isFoilFromResultNode(resultNode),
      });
    });

    foundItems = foundItems
      .filter(result => this.strongMatch(result.title, sanitisedSearchTerm))
      .filter(result => this.excludeArtCard(result.title));

    if (useCachedResults) this.cacheResults(this.name, sanitisedSearchTerm, foundItems);

    if (logResults) console.log(foundItems);
    // logs found items minus their logo, as it's gibberish and unhelpful
    if (logResults_withoutLogo) console.log(foundItems.map(item => ({...item, logo: 'a logo'})));

    return foundItems;
  }


  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm)).catch(() => ({data: ''}));


  searchTermToUrl = (searchTerm) => cors
    + this.baseUrl + this.searchPath
    + searchTerm.toLowerCase().split(' ').join(this.searchJoin)
    + this.searchSuffix;


  allResults = async (searchTerm) => this.getHtml(searchTerm)
    .then(({ data: html }) => {
      if (logHtml) console.log(html);
      const document = this.parser.parseFromString(html, "text/html");
      return document.querySelectorAll(this.resultSelector);
    });


  titleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.nameSelector)]
      .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`))[0] || '';


  priceFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.priceSelector)]
      .map(node => {
        const nodeText = node.innerHTML;
        return {
          text: this.priceToDisplayFromPriceText(nodeText).replace(regex.whiteSpaceStripper, `$2`),
          value: this.priceValueFromPriceText(nodeText),
        };
      })[0] || {text: '', value: 9999};


  stockFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.stockSelector)]
      .map(node => {
        const nodeText = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        const value = this.stockValueFromStockText(nodeText);
        return {
          value,
          text: value > 0 ? value + ' in Stock' : 'Out of Stock',
        };
      })[0] || {text: 'Out of Stock', value: 0};


  imgSrcFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.imgSelector)]
      .map(node => this.imgBaseUrl + node.getAttribute(this.imgSrcAttribute))[0] || null;


  productRefFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.productSelector)]
      .map(node => this.productBaseUrl + node.getAttribute(this.productRefAttribute).replace(regex.whiteSpaceStripper, `$2`))[0] || null;


  expansionFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.expansionSelector)]
      .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`))[0] || '';


  isFoilFromTitle = (title) => title.toLowerCase().includes('foil');
  isFoilFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.isFoilSelector)]
      .map(node => node.innerHTML)
      .map(text => this.isFoilFromTitle(text.toLowerCase()))[0] || false;


  readCachedResults = (sellerName, searchTerm) => getCachedResultsForSearch(sellerName, searchTerm);
  cacheResults = (sellerName, searchTerm, results) => setCachedResultsForSearch(sellerName, searchTerm, results);


  stripWord = (word) => word.split('').filter(l => /\w/.test(l)).join('').toLowerCase();
  strongMatch = (title, searchTerm) => this.stripWord(removeDiacritics(title)).includes(this.stripWord(searchTerm));
  excludeArtCard = (title) => {
    const strippedTitle = this.stripWord(title);
    return !(strippedTitle.includes('artcard') || strippedTitle.includes('artseries') || title.includes('(Art)'));
  }


}

export default AbstractModel;
