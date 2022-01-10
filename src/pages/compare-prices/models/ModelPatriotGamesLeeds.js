import { seller } from '../utils/enums';
import { identityFunction, textToDigits } from '../utils/utils';
import AbstractModel from './AbstractModel';

class ModelPatriotGamesLeeds {

  constructor() {
    this.name =  seller.pgLeeds.name;
    this.logo = seller.pgLeeds.logo;
    this.desktopModel = new ModelPatriotGamesLeedsDesktop();
    this.mobileModel = new ModelPatriotGamesLeedsMobile();
  }

  search = async (input) => {
    const desktopResults = await this.desktopModel.search(input);
    const mobileResults = await this.mobileModel.search(input);
    return desktopResults.length > 0 ? desktopResults : mobileResults;
  }

}

class ModelPatriotGamesLeedsDesktop extends AbstractModel {

  constructor() {
    super({
      name: seller.pgLeeds.name,
      logo: seller.pgLeeds.logo,
      baseUrl: 'http://www.patriotgamesleeds.com/',
      searchPath: 'index.php?main_page=advanced_search_result&search_in_description=1&keyword=',
      searchSuffix: '',
      searchJoin: '+',
      resultSelector: '#productListing > table > tbody> tr',
      nameSelector: 'td > h3.itemTitle > a',
      priceSelector: 'td.productListing-data > span.productBasePrice',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'td[align="right"] > a',
      stockValueFromStockText: identityFunction,
      isFoilSelector: 'td > h3.itemTitle > a',
      imgSelector: 'td.productListing-data > a > img',
      imgBaseUrl: 'http://www.patriotgamesleeds.com/',
      imgSrcAttribute: 'src',
      productSelector: 'td.productListing-data > a',
      productBaseUrl: '',
      productRefAttribute: 'href',
      expansionSelector: 'td.productListing-data > div.listingDescription',
    });
  }

  // @Override
  stockFromResultNode = (resultNode) => {
    let arr =[];
    resultNode.querySelectorAll(this.stockSelector)
      .forEach(node => {
        const text = node.innerHTML === '... more info' ? 'Out of Stock' : 'In Stock';
        arr.push({
          text,
          value: text === 'Out of Stock' ? 0 : 1,
        });
      });
    arr.push({text: 'In Stock', value: 1});
    return arr[0];
  }

  // @Override
  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll(this.expansionSelector)
      .forEach(node => {
        let r = /.*Set:(.*)Rarity.*/;
        arr.push(node.innerHTML.replace(r, `$1`));
      });
    return arr[0];
  }

}

class ModelPatriotGamesLeedsMobile extends AbstractModel {

  constructor() {
    super({
      name: seller.pgLeeds.name,
      logo: seller.pgLeeds.logo,
      baseUrl: 'http://www.patriotgamesleeds.com/',
      searchPath: 'index.php?main_page=advanced_search_result&search_in_description=1&keyword=',
      searchSuffix: '',
      searchJoin: '+',
      resultSelector: 'div.listing > div',
      nameSelector: 'div > h3 > a',
      priceSelector: 'div > div.list-price > span',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div > div.multiple-add-to-cart > div',
      stockValueFromStockText: identityFunction,
      isFoilSelector: 'div > h3 > a',
      imgSelector: 'div > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div > h3 > a',
      productBaseUrl: '',
      productRefAttribute: 'href',
      expansionSelector: 'div > div.listingDescription',
    });
  }

  // @Override
  stockFromResultNode = (resultNode) => {
    // Stock count is not displayed. Add to basket either is or is not displayed
    let isInStock = resultNode.querySelectorAll(this.stockSelector).length > 0;
    let text = isInStock ? 'In Stock' : 'Out of Stock';
    let value = isInStock ? 1 : 0;
    return { text, value };
  }

  // @Override
  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll(this.expansionSelector)
      .forEach(node => {
        let r = /.*Set:(.*)Rarity.*/;
        arr.push(node.innerHTML.replace(r, `$1`));
      });
    return arr[0];
  }
}

export default ModelPatriotGamesLeeds;
