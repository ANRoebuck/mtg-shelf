import { cors, identityFunction, removeTags, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './abstract/AbstractModel';
import AbstractDataGetter from './abstract/AbstractDataGetter';
import AbstractDataProcessor from './abstract/AbstractDataProcessor';
import AbstractProcessorSelector from './abstract/AbstractProcessorSelector';


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
  extractData = ({ data }) => {
    // use [\s\S] instead of . to include matching new line char
    let str = data.replace(/.*\((\{[\s\S]*\})\)/g, `$1`);
    // console.log(typeof  str);
    // console.log(str.split('').slice(0,50));
    // console.log(str);

    // local tests do not work but the model works live
    // suspected issue with json parsing

    let o;
    try {
      o = JSON.parse(str);
    } catch (e) {
      console.log(e);
    }
    // console.log(o);

    return o.html ;
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
      resultSelector: 'div > div.hawk-results-item',
      titleSelector: 'div > div > h2 > a',

      subresultSelector: 'div > div > div > div > div.hawk-results-item__options-table-row',
      subtitleSelector: 'div.hawk-results-item__options-table-cell.hawk-results-item__options-table-cell--name',
      subtitleFromText: removeTags,

      priceSelector: 'div.hawk-results-item__options-table-cell.hawk-results-item__options-table-cell--price',
      priceToDisplayFromPriceText: removeTags,
      priceValueFromPriceText: (text) => textToDigits(removeTags(text)),

      stockSelector: 'div.hawk-results-item__options-table-cell.hawk-results-item__options-table-cell--qty',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div > div > p > a',
      expansionSelector: 'div > div > p > a',

      imgSelector: 'div > div > div > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',

      productSelector: 'div > div > h2 > a',
      productBaseUrl: 'https://starcitygames.com',
      productRefAttribute: 'href',
    });
  }
}

export default Model_StarCityGames;
