import { cors, emptyString, identityFunction, preDashText, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';

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
      nameSelector: 'div.inner > div > div.meta > a > h4',
      priceSelector: 'div.inner > div.variants > div.variant-row > span > form > div > span.regular',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.inner > div > div.meta > div > div > span.variant-main-info > span.variant-qty',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div.inner > div > div.meta > a > h4',
      imgSelector: 'div.inner > div > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div.inner > div > div.image > a',
      productBaseUrl: 'https://www.harlequins-games.com',
      productRefAttribute: 'href',
      expansionSelector: 'div.inner > div > div.meta > a > span.category',
      conditionToDisplayFromPriceText: emptyString,
    });
  }
}

export default Model_Harlequins;
