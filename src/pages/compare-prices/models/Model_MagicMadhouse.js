import { cors, identityFunction, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';


class Model_MagicMadhouse extends AbstractModel {
  constructor() {
    super({
      name: seller.magicMadhouse.name,
      logo: seller.magicMadhouse.logo,
      dataGetter: new DataGetter_MagicMadhouse(),
      processorSelector: new ProcessorSelector_Madhouse(),
    });
  }
}

class DataGetter_MagicMadhouse extends AbstractDataGetter {
    constructor() {
    super({
      cors: cors,
      baseUrl: 'https://eucs25.ksearchnet.com/',
      searchPath: 'cloud-search/n-search/search?ticket=klevu-161710301480613427&term=',
      searchSuffix: '&paginationStartsFrom=0&sortPrice=false&ipAddress=undefined&analyticsApiKey=klevu-161710301480613427&showOutOfStockProducts=true&klevuFetchPopularTerms=false&klevu_priceInterval=500&fetchMinMaxPrice=true&klevu_multiSelectFilters=true&noOfResults=36&klevuSort=rel&enableFilters=true&filterResults=&visibility=search&category=KLEVU_PRODUCT&klevu_filterLimit=400&sv=121&lsqt=&responseType=json&priceFieldSuffix=GBP&klevu_loginCustomerGroup=',
      searchJoin: '%20',
    });
  }
}

class ProcessorSelector_Madhouse extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_Madhouse(),
    });
  }
}

class DataProcessor_Madhouse extends AbstractDataProcessor {
  constructor() {
    super({
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
    });
  }

  // @Override
  dataToResultsArray = (data) => data.result || [];

  // @Override
  titleFromResultNode = (resultNode) => resultNode.name.split('|')[0].replace(regex.whiteSpaceStripper, '$2');

  // @Override
  isFoilFromResultNode = (resultNode) => this.isFoilFromTitle(this.titleFromResultNode(resultNode));

  // @Override
  priceFromResultNode = ({ price }) => {
    return {
      text: "£ " + this.priceToDisplayFromPriceText(price),
      value: this.priceValueFromPriceText(price),
    };
  };

  // @Override
  stockFromResultNode = ({ inventory_level }) => {
    const value = parseInt(inventory_level);
    return {
      value,
      text: value > 0 ? value + ' in Stock' : 'Out of Stock',
    };
  };

  // @Override
  imgSrcFromResultNode = (resultNode) => resultNode.image;

  // @Override
  productRefFromResultNode = (resultNode) => resultNode.url;

  // @Override
  expansionFromResultNode = (resultNode) => resultNode.magic_set;

  // Override
  subtitleFromResultNode = (resultNode) => '';
}

export default Model_MagicMadhouse;
