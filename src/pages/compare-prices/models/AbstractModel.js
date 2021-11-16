import axios from 'axios';
import { cors, regex, removeDiacritics } from '../utils/utils';
import { getCachedResultsForSearch, setCachedResultsForSearch } from '../components/localStorageInteractions';


class AbstractModel {

  constructor({ name, logo, baseUrl, searchPath, searchSuffix, searchJoin, resultSelector, nameSelector,
                priceSelector, priceToDisplayFromPriceText, priceValueFromPriceText,
                stockSelector, stockValueFromStockText,
                imgSelector, imgBaseUrl, imgSrcAttribute,
                productSelector, productBaseUrl, productRefAttribute,
                expansionSelector,}) {
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

    let cachedResults = this.readCachedResults(this.name, sanitisedSearchTerm);
    // cachedResults = null;    // uncomment during testing to turn off reading from localstorage
    if (cachedResults) return cachedResults;

    let foundItems = [];
    const resultNodes = await this.allResults(sanitisedSearchTerm);

    // console.log(resultNodes.length);

    resultNodes.forEach(resultNode => {

      let name = this.name;
      let logo = this.logo;
      let title = this.nameFromResultNode(resultNode);
      let price = this.priceFromResultNode(resultNode);
      let stock = this.stockFromResultNode(resultNode);
      let imgSrc = this.imgSrcFromResultNode(resultNode);
      let productRef = this.productRefFromResultNode(resultNode);
      let expansion = this.expansionFromResultNode(resultNode);
      let isFoil = this.isFoilFromTitle(title);

      foundItems.push({
        name,
        logo,
        title,
        price,
        stock,
        imgSrc,
        productRef,
        expansion,
        isFoil,
      });

    });

    foundItems = foundItems
      .filter(result => this.strongMatch(result.title, sanitisedSearchTerm))
      .filter(result => this.excludeArtCard(result.title));

    this.cacheResults(this.name, sanitisedSearchTerm, foundItems);

    // logs found items minus their logo, as it's gibberish and unhelpful
    // console.log(foundItems.map(item => ({...item, logo: 'a logo'})));

    console.log(foundItems);
    return foundItems;
  }


  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm)).catch(() => ({data: ''}));


  searchTermToUrl = (searchTerm) => cors
    + this.baseUrl + this.searchPath
    + searchTerm.toLowerCase().split(' ').join(this.searchJoin)
    + this.searchSuffix;


  allResults = async (searchTerm) =>
    this.getHtml(searchTerm)
      .then(({ data: html }) => {
        // console.log(html);
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll(this.resultSelector);
      });


  nameFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.nameSelector)]
    .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`))[0] || '';


  priceFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.priceSelector)]
    .map(node => {
      const nodeText = node.innerHTML;
      return {
        text: this.priceToDisplayFromPriceText(nodeText),
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
    .map(node => node.innerHTML)[0] || null;


  isFoilFromTitle = (title) => title.toLowerCase().includes('foil');


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
