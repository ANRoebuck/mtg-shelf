import { cors, emptyString, identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';


class Model_MagicCardTrader extends AbstractModel {
  constructor() {
    super({
      name: seller.magicCardTrader.name,
      logo: seller.magicCardTrader.logo,
      dataGetter: new DataGetter_MagicCardTrader(),
      processorSelector: new ProcessorSelector_MagicCardTrader(),
    });
  }
}

class DataGetter_MagicCardTrader extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.themagiccardtrader.com/',
      searchPath: 'products/search?q=',
      searchSuffix: '',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_MagicCardTrader extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_MagicCardTrader(),
    });
  }
}

class DataProcessor_MagicCardTrader extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div.products-container > ul > li',
      nameSelector: 'div.inner > div.image-meta > div.meta > a > h4.name',
      priceSelector: 'div.inner > div.variants > div.variant-row > span.variant-buttons > form > div.product-price-qty > span',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.inner > div.variants > div.variant-row > span.variant-main-info > span.variant-qty',
      stockValueFromStockText: (text) => text === 'Out of stock' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div.inner > div.variants > div.variant-row > span.variant-main-info > span.variant-description',
      imgSelector: 'div.inner > div.image-meta > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div.inner > div.image-meta > div.image > a',
      productBaseUrl: 'https://www.themagiccardtrader.com/',
      productRefAttribute: 'href',
      expansionSelector: 'div.inner > div.image-meta > div.meta > a > span.category',
      conditionToDisplayFromPriceText: emptyString,
    });
  }

  // @Override
  isFoilFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.isFoilSelector)]
      .map(node => node.innerHTML)
      .map(text => this.isFoilFromTitle(text.toLowerCase()))[0]
    || this.isFoilFromTitle(this.titleFromResultNode(resultNode));

}

export default Model_MagicCardTrader;
