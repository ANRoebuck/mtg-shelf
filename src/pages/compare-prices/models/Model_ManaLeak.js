import { seller } from '../utils/enums';
import { cors, emptyString, identityFunction, textToDigits } from "../utils/utils";
import AbstractModel from './AbstractModel';
import AbstractDataGetter from "./AbstractDataGetter";
import AbstractProcessorSelector from "./AbstractProcessorSelector";
import AbstractDataProcessor from "./AbstractDataProcessor";


class Model_ManaLeak extends AbstractModel {
  constructor() {
    super({
      name: seller.manaLeak.name,
      logo: seller.manaLeak.logo,
      dataGetter: new DataGetter_ManaLeak(),
      processorSelector: new ProcessorSelector_ManaLeak(),
    });
  }
}

class DataGetter_ManaLeak extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.manaleak.com/',
      searchPath: '/index.php?route=product/search&search=',
      searchSuffix: '',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_ManaLeak extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_ManaLeak(),
    });
  }
}

class DataProcessor_ManaLeak extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div.main-products > div.product-list-item',
      nameSelector: 'div.caption > div.name > a',
      priceSelector: 'div.caption > div.price',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.image > span.label-outofstock',
      stockValueFromStockText: identityFunction,
      isFoilSelector: 'div.caption > div.name > a',
      imgSelector: 'div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'data-src',
      productSelector: 'div.image > a',
      productBaseUrl: 'https://www.manaleak.com/',
      productRefAttribute: 'href',
      expansionSelector: 'div.caption > div.description > p > a',
      conditionToDisplayFromPriceText: emptyString,
    });
  }

  // @Override
  stockFromResultNode = (resultNode) => {
    // Stock count is not displayed. An out of stock banner either is or is not present.
    let isInStock = resultNode.querySelectorAll(this.stockSelector).length === 0;
    let text = isInStock ? 'In Stock' : 'Out of Stock';
    let value = isInStock ? 1 : 0;
    return { text, value };
  }
}

export default Model_ManaLeak;
