import axios from 'axios';
import { cors, identityFunction, regex, textToDigits } from '../utils/utils';
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
  getData = async (searchTerm) => {
    const { data: url } = await this.searchTermToUrl(searchTerm);
    return axios.get(this.cors + url)
      .then(({ data }) => data || '')
      .catch(() => '');
  }

  // @Override
  searchTermToUrl = async (searchTerm) => axios
    .get(`https://api.scryfall.com/cards/named?fuzzy=${searchTerm.split('').join('+')}`)
    .then(r => ({ data: r.data.purchase_uris.cardmarket }));
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

    // a single results page has a title element
    const singleResultTitle = document.querySelectorAll('div.page-title-container > div.flex-grow-1 > h1');

    return singleResultTitle.length > 0 ? this.singleResult : this.pluralResult;
  };

}

class DataProcessor_MKM_singleResult {
  constructor() {
    this.titleSelector = 'div.page-title-container > div.flex-grow-1 > h1';
    this.fromSelector = 'div > div > dl > dd:nth-child(10)';
    this.trendSelector = 'div > div > dl > dd:nth-child(12)';
    this.expansionSelector = 'div > div > dl > dd:nth-child(6)';
    this.symbolSelector = 'div > div > dl > dd:nth-child(6)';
    this.symbolAttibuteSelector = 'mb-2';
    this.imgSrcSelector = '#image > div > div > div:nth-child(2) > div > img';
    this.imgSrcAttribute = 'src';

    this.parser = new DOMParser();
  }

  processData = (data) => {
    console.log('processing single result');

    const document = this.parser.parseFromString(data, "text/html");

    return [
      {
        title: this.getTextFromElement(document, this.titleSelector),
        from: this.getPriceFromElement(document, this.fromSelector),
        trend: this.getPriceFromElement(document, this.trendSelector),
        expansion: this.getTextFromElement(document, this.expansionSelector),
        symbol: this.getAttributeFromElement(document, this.symbolSelector, this.symbolAttibuteSelector),
        imgSrc: this.getAttributeFromElement(document, this.imgSrcSelector, this.imgSrcAttribute),
      },
    ]
  }

  getTextFromElement = (document, selector) =>
    [...document.querySelectorAll(selector)]
      .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`))[0] || '';

  getPriceFromElement = (document, selector) =>
    [...document.querySelectorAll(selector)]
      .map(node => {
        const nodeText = node.innerHTML;
        return {
          text: nodeText.replace(regex.whiteSpaceStripper, `$2`),
          value: textToDigits(nodeText),
        };
      })[0] || {text: '', value: 9999};

  getAttributeFromElement = (document, selector, key, defaultValue = null) =>
    [...document.querySelectorAll(selector)]
      .map(element => element.getAttribute(key))[0] || defaultValue;

}



class DataProcessor_MKM_pluralResult {
  constructor() {
    this.singleResultProcessor = new DataProcessor_MKM_singleResult();
  }

  processData = () => {
    console.log('processing plural result');

    return [];
  }

}


export default Model_MKM;
