import { cors, identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';


class Model_TrollTrader extends AbstractModel {
  constructor() {
    super({
      name: seller.trollTrader.name,
      logo: seller.trollTrader.logo,
      dataGetter: new DataGetter_TrollTrader(),
      processorSelector: new ProcessorSelector_TrollTrader(),
    });
  }
}

class DataGetter_TrollTrader extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.trolltradercards.com/',
      searchPath: 'products/search?q=',
      searchSuffix: '',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_TrollTrader extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_TrollTrader(),
    });
  }
}

class DataProcessor_TrollTrader extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div.products-container > ul > li.product',
      nameSelector: 'div.inner > div > div.meta > a > h4',
      priceSelector: 'div.inner > div > div.meta > span.offers > span.price',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.inner > div > div.meta > span.offers > span.qty',
      stockValueFromStockText: (text) => text === undefined ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div.inner > div > div.meta > a > h4',
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

export default Model_TrollTrader;
