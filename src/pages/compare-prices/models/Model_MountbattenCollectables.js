import { seller } from '../utils/enums';
import { cors, identityFunction, textToDigits } from "../utils/utils";
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';

class Model_MountbattenCollectables extends AbstractModel {
  constructor() {
    super({
      name: seller.mountBatten.name,
      logo: seller.mountBatten.logo,
      dataGetter: new DataGetter_MountbattenCollectables(),
      processorSelector: new ProcessorSelector_MountbattenCollectables(),
    });
  }

}

class DataGetter_MountbattenCollectables extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.mountbattencollectables.com/',
      searchPath: 'products/search?q=',
      searchSuffix: '',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_MountbattenCollectables extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_MountbattenCollectables(),
    });
  }
}

class DataProcessor_MountbattenCollectables extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'ul.products > li.product',
      titleSelector: 'div.inner > div > div.meta > a > h4',

      priceSelector: 'div.inner > div > div.meta > div.list-variants.grid > div > span > form > div > span.regular',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,

      stockSelector: 'div.inner > div > div.meta > div > div > span.variant-main-info > span.variant-qty',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div.inner > div > div.meta > a > h4',
      expansionSelector: 'div.inner > div > div.meta > a > span.category',

      imgSelector: 'div.inner > div > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',

      productSelector: 'div.inner > div > div.image > a',
      productBaseUrl: 'https://www.mountbattencollectables.com/',
      productRefAttribute: 'href',
    });
  }
}


export default Model_MountbattenCollectables;
