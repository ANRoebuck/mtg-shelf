import {
  cors,
  identityFunction,
  minorUnitsToText,
  textToDigits
} from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './abstract/AbstractModel';
import AbstractDataGetter from './abstract/AbstractDataGetter';
import AbstractDataProcessor from './abstract/AbstractDataProcessor';
import AbstractProcessorSelector from './abstract/AbstractProcessorSelector';


const OVERRIDDEN_METHOD = 'this method is overriden';

class Model_LazyDragonGaming extends AbstractModel {
  constructor() {
    super({
      name: seller.lazyDragon.name,
      logo: seller.lazyDragon.logo,
      dataGetter: new DataGetter_LazyDragonGaming(),
      processorSelector: new ProcessorSelector_LazyDragonGaming(),
    });
  }
}

class DataGetter_LazyDragonGaming extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.lazydragongaming.com/',
      searchPath: 'search?q=*',
      searchSuffix: '*',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_LazyDragonGaming extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_LazyDragonGaming(),
    });
  }
}

class DataProcessor_LazyDragonGaming extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div.collectionGrid > div.productCard__card',
      titleSelector: 'div.productCard__lower > p.productCard__title > a',

      subresultSelector: 'div > ul > li.productChip',
      subtitleSelector: OVERRIDDEN_METHOD,
      subtitleFromText: identityFunction,

      priceSelector: OVERRIDDEN_METHOD,
      priceToDisplayFromPriceText: minorUnitsToText,
      priceValueFromPriceText: textToDigits,

      stockSelector: OVERRIDDEN_METHOD,
      stockValueFromStockText: identityFunction,
      isFoilSelector: OVERRIDDEN_METHOD,
      expansionSelector: 'div > p.productCard__setName',

      imgSelector: 'div > a > div.productCard__imageWrap > img',
      imgBaseUrl: 'https://',
      imgSrcAttribute: 'data-src',

      productSelector: 'div > p.productCard__title > a',
      productBaseUrl: 'https://www.lazydragongaming.com',
      productRefAttribute: 'href',
    });
  }

  // @Override
  subtitleFromResultNode = (resultNode) => resultNode.getAttribute('data-varianttitle');

  // @Override
  priceFromResultNode = (resultNode) => {
    const nodeText = resultNode.getAttribute('data-variantprice');
    return {
      text: this.priceToDisplayFromPriceText(nodeText, seller.lazyDragon.currency),
      value: this.priceValueFromPriceText(nodeText)
    }
  }

  // @Override
  stockFromResultNode = (resultNode) => {
    // Only in stock results are shown
    const value = resultNode.getAttribute('data-variantqty');
    return { text: value + ' in Stock', value };
  }

  // @Override
  isFoilFromResultNode = (resultNode) => this.isFoilFromTitle(this.subtitleFromResultNode(resultNode));

}

export default Model_LazyDragonGaming;
