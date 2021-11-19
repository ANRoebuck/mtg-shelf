import { identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelMagicCardTrader extends AbstractModel {

  constructor() {
    super({
      name: seller.magicCardTrader.name,
      logo: seller.magicCardTrader.logo,
      baseUrl: 'https://www.themagiccardtrader.com/',
      searchPath: 'products/search?q=',
      searchSuffix: '',
      searchJoin: '+',
      resultSelector: 'div.products-container > ul > li',
      nameSelector: 'div.inner > div.image-meta > div.meta > a > h4.name',
      priceSelector: 'div.inner > div.variants > div.variant-row > span.variant-buttons > form > div.product-price-qty > span',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.inner > div.variants > div.variant-row > span.variant-main-info > span.variant-qty',
      stockValueFromStockText: (text) => text === 'Out of stock' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      imgSelector: 'div.inner > div.image-meta > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div.inner > div.image-meta > div.image > a',
      productBaseUrl: 'https://www.themagiccardtrader.com/',
      productRefAttribute: 'href',
      expansionSelector: 'div.inner > div.image-meta > div.meta > a > span.category',
    });
  }

}

export default ModelMagicCardTrader;
