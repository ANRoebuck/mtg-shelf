import { seller } from '../utils/enums';
import { identityFunction, textToDigits } from '../utils/utils';
import AbstractModel from './AbstractModel';

// For testing purposes an optional type can be provided to force the use of mobile/desktop view
// If not provided, a window size check will be performed to determine which model to return
const aPatriotGamesLeedsModel = (optionalType) => {
  if (optionalType === 'desktop') return new ModelPatriotGamesLeedsDesktop();
  if (optionalType === 'mobile') return new ModelPatriotGamesLeedsMobile();
  return checkWindowSize() ? new ModelPatriotGamesLeedsDesktop() : new ModelPatriotGamesLeedsMobile();
}
const checkWindowSize = () => window.innerWidth <= 425;

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
        const text = node.innerHTML === '... more info' ? "Out of Stock" : "In Stock";
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
      resultSelector: 'table > tbody> tr',
      nameSelector: 'td > h3.itemTitle > a',
      priceSelector: 'td.ui-table-priority-3 > span.productBasePrice',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'td.ui-table-priority-3 > a',
      stockValueFromStockText: identityFunction,
      imgSelector: 'td > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'td > h3.itemTitle > a',
      productBaseUrl: '',
      productRefAttribute: 'href',
      expansionSelector: 'td > div.listingDescription',
    });
    console.log("using mobile model")
  }

  // @Override
  stockFromResultNode = (resultNode) => {
    let arr =[];
    resultNode.querySelectorAll(this.stockSelector)
      .forEach(node => {
        const text = node.innerHTML === '... more info' ? "Out of Stock" : "In Stock";
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

export default aPatriotGamesLeedsModel;
