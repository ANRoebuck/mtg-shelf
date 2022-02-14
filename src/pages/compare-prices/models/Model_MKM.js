import axios from 'axios';
import { cors, identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';

const OVERRIDDEN_METHOD = 'this method is overriden';

class Model_MKM extends AbstractModel {
  constructor() {
    super({
      name: seller.mkm.name,
      logo: seller.mkm.logo,
      dataGetter: new DataGetter_MKM(),
      processorSelector: new ProcessorSelector_MKM(),
    });
  }
}

class DataGetter_MKM extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: OVERRIDDEN_METHOD,
      searchPath: OVERRIDDEN_METHOD,
      searchSuffix: OVERRIDDEN_METHOD,
      searchJoin: OVERRIDDEN_METHOD,
    });
  }

  // @Override
  searchTermToUrl = (searchTerm) => axios
    .get(`https://api.scryfall.com/cards/named?fuzzy=${searchTerm.split('').join('+')}`)
    .then(r => ({ data: r.data.purshase_uris.cardmarket }));
}

class ProcessorSelector_MKM extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: null,
    });
    this.singleResult = new DataProcessor_MKM_singleResult();
    this.pluralResult = new DataProcessor_MKM_pluralResult();
  }

  getProcessor = (rawData) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(rawData, "text/html");

    // resultsSelector
    const singleResultTitle = document.querySelectorAll(
      'body > main > div.page-title-container.d-flex.align-items-center.text-break > div.flex-grow-1 > h1');

    return singleResultTitle.length > 0 ? this.singleResult : this.pluralResult;
  };

}

class DataProcessor_MKM_singleResult extends AbstractDataProcessor {
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

class DataProcessor_MKM_pluralResult extends AbstractDataProcessor {
  constructor() {
    super();
  }
}


export default Model_MKM;
