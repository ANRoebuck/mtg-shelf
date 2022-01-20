import { cors, emptyString, identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';


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
      nameSelector: 'div.inner > div > div.meta > a > h4',
      priceSelector: 'div.inner > div > div.meta > div.list-variants.grid > div > span > form > div > span.regular',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.inner > div > div.meta > div> div > span.variant-main-info > span.variant-qty',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div.inner > div > div.meta > a > h4',
      imgSelector: 'div.inner > div > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div.inner > div > div.image > a',
      productBaseUrl: 'https://www.axionnow.com/',
      productRefAttribute: 'href',
      expansionSelector: 'div.inner > div > div.meta > a > span.category',
      conditionToDisplayFromPriceText: emptyString,
    });
  }
}


export default Model_Axion;
