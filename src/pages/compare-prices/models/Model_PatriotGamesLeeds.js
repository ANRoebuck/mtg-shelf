import { cors, identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';


class Model_PatriotGamesLeeds extends AbstractModel {
  constructor() {
    super({
      name:  seller.pgLeeds.name,
      logo: seller.pgLeeds.logo,
      dataGetter: new DataGetter_PatriotGamesLeeds(),
      processorSelector: new ProcessorSelector_PatriotGamesLeeds(),
    });
  }
}

class DataGetter_PatriotGamesLeeds extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'http://www.patriotgamesleeds.com/',
      searchPath: 'index.php?main_page=advanced_search_result&search_in_description=1&keyword=',
      searchSuffix: '',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_PatriotGamesLeeds extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: null,
    });
    this.desktop = new DataProceesor_PatriotGamesLeeds_Desktop();
    this.mobile = new DataProceesor_PatriotGamesLeeds_Mobile();
  }

  getProcessor = (rawData) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(rawData, "text/html");

    // resultsSelector
    const desktopElements = document.querySelectorAll('#productListing > table > tbody> tr');

    return desktopElements.length > 0 ? this.desktop : this.mobile;
  };
}

class DataProceesor_PatriotGamesLeeds_Desktop extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: '#productListing > table > tbody> tr',
      titleSelector: 'td > h3.itemTitle > a',

      priceSelector: 'td.productListing-data > span.productBasePrice',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,

      stockSelector: 'td[align="right"] > a',
      stockValueFromStockText: identityFunction,
      isFoilSelector: 'td > h3.itemTitle > a',
      expansionSelector: 'td.productListing-data > div.listingDescription',

      imgSelector: 'td.productListing-data > a > img',
      imgBaseUrl: 'http://www.patriotgamesleeds.com/',
      imgSrcAttribute: 'src',

      productSelector: 'td.productListing-data > a',
      productBaseUrl: '',
      productRefAttribute: 'href',
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

class DataProceesor_PatriotGamesLeeds_Mobile extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div.listing > div',
      titleSelector: 'div > h3 > a',

      priceSelector: 'div > div.list-price > span',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,

      stockSelector: 'div > div.multiple-add-to-cart > div',
      stockValueFromStockText: identityFunction,
      isFoilSelector: 'div > h3 > a',
      expansionSelector: 'div > div.listingDescription',

      imgSelector: 'div > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',

      productSelector: 'div > h3 > a',
      productBaseUrl: '',
      productRefAttribute: 'href',
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

export default Model_PatriotGamesLeeds;
