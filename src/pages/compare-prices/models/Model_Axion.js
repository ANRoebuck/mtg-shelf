import { cors, identityFunction, textToDigits } from '../utils/utils';
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
      searchPath: 'search?type=product&q=',
      searchSuffix: '&filter.v.availability=1&filter.v.option.finish=Non-Foil',
      // searchSuffix: '&filter.v.availability=1&filter.v.option.finish=Foil',
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
      resultSelector: 'div[class="#collection-grid"] > div > div',
      titleSelector: 'a',

      priceSelector: 'div[class="#product-card-caption @offset-top"] > div[class="#product-card-price"] > dl > div > dd',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,

      stockSelector: 'a', // there is no stock selector, but map requires an element
      stockValueFromStockText: () => 1,
      isFoilSelector: 'div.inner > div > div.meta > a > h4',
      expansionSelector: 'div.inner > div > div.meta > a > span.category',

      imgSelector: 'div[class="#product-card-media"] > div > div[class="#media-image-wrapper"] > img',
      imgBaseUrl: 'https:',
      imgSrcAttribute: 'src',

      productSelector: 'a',
      productBaseUrl: 'https://www.axionnow.com/',
      productRefAttribute: 'href',
    });
  }
}


export default Model_Axion;
