import { cors, identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './abstract/AbstractModel';
import AbstractDataGetter from './abstract/AbstractDataGetter';
import AbstractDataProcessor from './abstract/AbstractDataProcessor';
import AbstractProcessorSelector from './abstract/AbstractProcessorSelector';


class Model_Axion extends AbstractModel {
  constructor() {
    super({
      name: seller.axion.name,
      logo: seller.axion.logo,
      dataGetter: new DataGetter_Axion(),
      processorSelector: new ProcessorSelector_Axion(),
    });
  }
}

class DataGetter_Axion extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.axionnow.com/',
      searchPath: 'products/search?q=',
      searchSuffix: '',
      searchJoin: '+'
    });
  }
}

class ProcessorSelector_Axion extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_Axion(),
    });
  }
}

class DataProcessor_Axion extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'ul.products > li.product',
      titleSelector: 'div.inner > div > div.meta > a > h4',

      priceSelector: 'div.inner > div > div.meta > div.list-variants.grid > div > span > form > div > span.regular',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,

      stockSelector: 'div.inner > div > div.meta > div> div > span.variant-main-info > span.variant-qty',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div.inner > div > div.meta > a > h4',
      expansionSelector: 'div.inner > div > div.meta > a > span.category',

      imgSelector: 'div.inner > div > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',

      productSelector: 'div.inner > div > div.image > a',
      productBaseUrl: 'https://www.axionnow.com/',
      productRefAttribute: 'href',
    });
  }
}


export default Model_Axion;
