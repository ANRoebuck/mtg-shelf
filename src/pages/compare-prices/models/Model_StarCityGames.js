import { cors, identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';


class Model_StarCityGames extends AbstractModel {
  constructor() {
    super({
      name: seller.starCityGames.name,
      logo: seller.starCityGames.logo,
      dataGetter: new DataGetter_StarCityGames(),
      processorSelector: new ProcessorSelector_StarCityGames(),
    });
  }
}

class DataGetter_StarCityGames extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://starcitygames.hawksearch.com/',
      searchPath: 'sites/starcitygames/?search_query=',
      searchSuffix: '&ajax=1&json=1&hawkcustom=undefined&hawkvisitorid=foo&callback=jQuery3410974876865918253_1633569817522&_=1633569817523',
      searchJoin: '%20',
    });
  }

  // @Override
  extractData = (data) => {
    let str = data.replace(/.*\(({.*})\)/g, `$1`);
    let o = JSON.parse(`${str}`);
    return { data: o.html };
  };
}

class ProcessorSelector_StarCityGames extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_StarCityGames(),
    });
  }
}

class DataProcessor_StarCityGames extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div > .hawk-results-item',
      titleSelector: 'div > div > div > h2 > a',

      priceSelector: 'div.hawk-results-item__options-table-cell.hawk-results-item__options-table-cell--price.childAttributes',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,

      stockSelector: 'div.hawk-results-item__options-table-cell.hawk-results-item__options-table-cell--qty.childAttributes',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div > div > div > h2 > a',
      expansionSelector: 'div > div > p > a',

      imgSelector: 'div > div > div > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',

      productSelector: 'div > div > div > h2 > a',
      productBaseUrl: 'https://starcitygames.com',
      productRefAttribute: 'href',
    });
  }
}

export default Model_StarCityGames;
