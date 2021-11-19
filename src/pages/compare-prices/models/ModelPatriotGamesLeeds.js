import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import { identityFunction, textToDigits } from "../utils/utils";

const aPatriotGamesLeedsModel = () => {
  if (true) return new ModelPatriotGamesLeedsDesktop();
  else return new ModelPatriotGamesLeedsMobile();
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
        let r = /.*Set\:(.*)Rarity.*/;
        arr.push(node.innerHTML.replace(r, `$1`));
      });
    return arr[0];
  }

}

class ModelPatriotGamesLeedsMobile extends AbstractModel {

}

export default aPatriotGamesLeedsModel;
