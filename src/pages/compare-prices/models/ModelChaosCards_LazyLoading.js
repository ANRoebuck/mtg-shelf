import axios from 'axios';
import { cors, regex } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelChaosCards_LazyLoading extends AbstractModel {

  constructor() {
    super();
    this.name = seller.chaos.name;
    this.logo = seller.chaos.logo;

    // lazy loading website means GET request to main page does not return results
    // instead, make cheeky request to their back end
    this.baseUrl = 'https://eu1-search.doofinder.com/5/search?hashid=e335ee744310ac28c6e30f4083912586&query_counter=1&page=1&rpp=10&filter%5Bavailability%5D=In%20stock&transformer=basic&query_name=match_and&query=';
    this.searchPath = '';
    this.searchSuffix = '';
    this.isMagicCard = ' - Magic the Gathering Single Card';
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

  searchTermToUrl = searchTerm => cors + this.baseUrl + this.searchPath +
    searchTerm.toLowerCase().split(' ').join('%20') + this.searchSuffix;

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data}) => {
        return data.results.filter(r => {
          return r.hasOwnProperty('title') && r.hasOwnProperty('price')
            && r.hasOwnProperty('link')
            && r.hasOwnProperty('image_link')
            && r.title.includes(this.isMagicCard);
          });
      });
  }

  nameFromResultNode = (resultNode) => {
    return resultNode.title.replace(regex.colonSplitter, `$1`).replace(regex.whiteSpaceStripper, `$2`);
  }

  priceFromResultNode = (resultNode) => {
    let value = this.priceValueFromPriceText(resultNode.price);
    let trailing0 = value % 10 === 0 ? '0' : '';
    let trailing00 = value % 100 === 0 ? '0' : '';
    let text = '£ ' + value / 100 + trailing00 + trailing0;
    return {
      text,
      value,
    };
  }
  priceValueFromPriceText = (text) => text ? text * 100 : 9999;

  stockFromResultNode = (resultNode) => {
    return {
      text: 'In Stock',
      value: 1
    };
  }
  // stockValueFromStockText = (text) => text === 'Out of Stock' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`));

  imgSrcFromResultNode = (resultNode) => {
    return resultNode.image_link;
  }

  productRefFromResultNode = (resultNode) => {
    return resultNode.link;
  }

  expansionFromResultNode = (resultNode) => {
    return resultNode.title.replace(regex.colonSplitter, `$2`).replace(this.isMagicCard, '');
  }

  isFoilFromTitle = (title) => {
    return title.toLowerCase().includes('foil');
  }

}

export default ModelChaosCards_LazyLoading;
