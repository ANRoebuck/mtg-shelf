import axios from 'axios';
import { cors, regex } from '../utils/utils';
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

  search = async (searchTerm) => {

    const cachedResults = this.readCachedResults(this.name, searchTerm);
    if (cachedResults) return cachedResults;

    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);

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

    this.cacheResults(this.name, searchTerm, foundItems);

    return foundItems;
  }


  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm)).catch(() => []);


  searchTermToUrl = (searchTerm) => cors
    + this.baseUrl + this.searchPath
    + searchTerm.toLowerCase().split(' ').join(this.searchJoin)
    + this.searchSuffix;


  allResults = async (searchTerm) =>
    this.getHtml(searchTerm)
      .then(({ data: html }) => {
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
    .map(node => this.productBaseUrl + node.getAttribute(this.productRefAttribute))[0] || null;


  expansionFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.expansionSelector)]
    .map(node => node.innerHTML)[0] || null;


  isFoilFromTitle = (title) => title.toLowerCase().includes('foil');


  readCachedResults = (sellerName, searchTerm) => getCachedResultsForSearch(sellerName, searchTerm);
  cacheResults = (sellerName, searchTerm, results) => setCachedResultsForSearch(sellerName, searchTerm, results);

}

export default AbstractModel;
