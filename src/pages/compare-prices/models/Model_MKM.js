import axios from 'axios';
import { cors, identityFunction, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';

const OVERRIDDEN_METHOD = 'this method is overriden';

const mkmKeys = {
  rarity: "Rarity",
  collector_number: "Number",
  printedIn: "Printed in",
  reprints: "Reprints",
  quantity: "Available items",
  from: "From",
  trend: "Price Trend",
  trend30: "30-days average price",
  trend7: "7-days average price",
  trend1: "1-day average price",
}

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
    this.expansionSelector = 'div.page-title-container > div.flex-grow-1 > h1 > span';
    this.imgSrcSelector = '#image > div > div > div:nth-child(2) > div > img';
    this.imgSrcAttribute = 'src';

    this.dataTableSelector = 'div > div.col-12.col-lg-6.mx-auto > div > div.info-list-container.col-12.col-md-8.col-lg-12.mx-auto.align-self-start > dl';
    this.dataKeySelector = 'dt';
    this.dataValueSelector = 'dd';

    this.parser = new DOMParser();
  }

  processData = (data) => {
    console.log('processing single result');

    const document = this.parser.parseFromString(data, "text/html");

    const dataTable = this.populateDataTable(document);
    const attributes = this.attributesFromDataTable(dataTable);

    return [
      {
        title: this.getTitleFromElement(document, this.titleSelector),
        expansion: this.getExpansionFromElement(document, this.expansionSelector),
        imgSrc: this.getAttributeFromElementFromDocument(document, this.imgSrcSelector, this.imgSrcAttribute),

        ...attributes,
      },
    ]
  }

  populateDataTable = (document) => {
    const keys = [...document.querySelectorAll(this.dataKeySelector)]
      .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`));
    const values = [...document.querySelectorAll(this.dataValueSelector)];

    const dataTable = {};

    keys.forEach((k, i) => dataTable[k] = values[i]);

    return dataTable;
  }

  attributesFromDataTable = (dataTable) => {
    const from = this.getPriceFromElement(dataTable[mkmKeys.from]);
    const trend = this.getPriceFromElement(dataTable[mkmKeys.trend]);
    return {
      from,
      trend,
    };
  }

  getTitleFromElement = (document, selector) => this.getTextFromElement(document, selector)
    .replace(/(.?)<.*/g, `$1`)                  // take first segment before opening <
    .replace(regex.whiteSpaceStripper, `$2`)    // remove leading+trailing whitespace

  getExpansionFromElement = (document, selector) => this.getTextFromElement(document, selector)
    .replace(/(.?)-.*/g, `$1`)                  // take first segment before -
    .replace(regex.whiteSpaceStripper, `$2`)    // remove leading+trailing whitespace

  getTextFromElement = (document, selector) =>
    [...document.querySelectorAll(selector)]
      .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`))[0] || '';

  getPriceFromElement = (node) =>
    [node].map(node => {
        const nodeText = node.innerHTML;
        return {
          text: nodeText.replace(regex.whiteSpaceStripper, `$2`),
          value: textToDigits(nodeText),
        };
      })[0] || {text: '', value: 9999};

  getAttributeFromElementFromDocument = (document, selector, key, defaultValue = '') =>
    [...document.querySelectorAll(selector)]
      .map(element => element.getAttribute(key))[0] || defaultValue;

}



class DataProcessor_MKM_pluralResult {
  constructor() {
    this.singleResultProcessor = new DataProcessor_MKM_singleResult();
    this.foo = 'div > div:nth-child(4) > div > div.col-12.col-md-8.px-2.flex-column > a';
    this.bar = 'href';

    this.cors = cors;
    this.urlPrefix = 'https://www.cardmarket.com/';
    this.parser = new DOMParser();
  }

  processData = async (data) => {
    console.log('processing plural result');

    const document = this.parser.parseFromString(data, "text/html");

    const resultLinkElements = document.querySelectorAll(this.foo);

    const urls = [...resultLinkElements].map(r => this.getAttributeFromElement(r, this.bar));

    let allResults = [];

    for (const url of urls) {
      if (!url.toLowerCase().includes('singles')) continue;
      const rawData = await axios.get(this.cors + this.urlPrefix + url)
        .then(({ data }) => data || '')
        .catch(() => '');
      const results = this.singleResultProcessor.processData(rawData);
      allResults = allResults.concat(results)
    }

    return [...allResults];
  }

  getAttributeFromElement = (element, key, defaultValue = '') => element.getAttribute(key) || defaultValue;

}


export default Model_MKM;
