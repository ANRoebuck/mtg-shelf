import { cors, identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './abstract/AbstractModel';
import AbstractDataGetter from './abstract/AbstractDataGetter';
import AbstractDataProcessor from './abstract/AbstractDataProcessor';
import AbstractProcessorSelector from './abstract/AbstractProcessorSelector';

class Model_Harlequins extends AbstractModel {
  constructor() {
    super({
      name: seller.harlequins.name,
      logo: seller.harlequins.logo,
      dataGetter: new DataGetter_Harlequins(),
      processorSelector: new ProcessorSelector_Harlequins(),
    });
  }
}

class DataGetter_Harlequins extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.harlequins-games.com/',
      searchPath: 'products/search?q=',
      searchSuffix: '&c=8&disable_mobile=1',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_Harlequins extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_Harlequins(),
    });
  }
}

class DataProcessor_Harlequins extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'ul.products > li.product',
      titleSelector: 'div.inner > div > div.meta > a > h4',

      subresultSelector: 'div.inner > div.variants > div.variant-row',
      subtitleSelector: 'span > span.variant-short-info.variant-description',
      subtitleFromText: identityFunction,

      priceSelector: 'div.inner > div.variants > div.variant-row > span > form > div > span.regular',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,

      stockSelector: 'span > span.variant-short-info.variant-qty',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div.inner > div > div.meta > a > h4',
      expansionSelector: 'div.inner > div > div.meta > a > span.category',

      imgSelector: 'div.inner > div > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',

      productSelector: 'div.inner > div > div.image > a',
      productBaseUrl: 'https://www.harlequins-games.com',
      productRefAttribute: 'href',
    });
  }
}

export default Model_Harlequins;
