import { identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelTrollTrader extends AbstractModel {

  constructor() {
    super({
      name: seller.trollTrader.name,
      logo: seller.trollTrader.logo,
      baseUrl: 'https://www.trolltradercards.com/',
      searchPath: 'products/search?q=',
      searchSuffix: '',
      searchJoin: '+',
      resultSelector: 'div.products-container > ul > li.product',
      nameSelector: 'div.inner > div > div.meta > a > h4',
      priceSelector: 'div.inner > div > div.meta > span.offers > span.price',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.inner > div > div.meta > span.offers > span.qty',
      stockValueFromStockText: (text) => text === undefined ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      imgSelector: 'div.inner > div > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div.inner > div > div.image > a',
      productBaseUrl: 'https://www.trolltradercards.com/',
      productRefAttribute: 'href',
      expansionSelector: 'div.inner > div > div.meta > span.category'
    });
  }

}

export default ModelTrollTrader;
