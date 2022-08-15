import { cors, identityFunction, postCurrencyText, preDashText, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './abstract/AbstractModel';
import AbstractDataGetter from './abstract/AbstractDataGetter';
import AbstractDataProcessor from './abstract/AbstractDataProcessor';
import AbstractProcessorSelector from './abstract/AbstractProcessorSelector';


class Model_NerdShak extends AbstractModel {
  constructor() {
    super({
      name: seller.nerdShak.name,
      logo: seller.nerdShak.logo,
      dataGetter: new DataGetter_NerdShak(),
      processorSelector: new ProcessorSelector_NerdShak(),
    });
  }
}

class DataGetter_NerdShak extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://nerdshak.com/',
      searchPath: 'search?q=*',
      searchSuffix: '*',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_NerdShak extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_NerdShak(),
    });
  }
}

class DataProcessor_NerdShak extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div > div.row > div.col-md-4',
      titleSelector: 'div > p.productTitle',

      subresultSelector: 'div > div.hoverMask > div > div.addNow ',
      subtitleSelector: 'p',
      subtitleFromText: preDashText,

      priceSelector: 'p',
      priceToDisplayFromPriceText: postCurrencyText,
      priceValueFromPriceText: textToDigits,

      stockSelector: 'p',
      stockValueFromStockText: identityFunction,
      isFoilSelector: 'div > p.productTitle',
      expansionSelector: 'div > p.productTitle',

      imgSelector: 'div > div.imgWrapper > img.items-even',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',

      productSelector: 'div > div > div.view > a',
      productBaseUrl: 'https://nerdshak.com',
      productRefAttribute: 'href',


      conditionToDisplayFromPriceText: preDashText,
    });
  }

  // @Override
  titleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.titleSelector)]
      .map(node => node.innerHTML
        .replace(/(.*)\[.*/g, `$1`)                 // take first segment before opening [
        .replace(/<br>/, '')                        // remove linebreak html
        .replace(regex.brackets, ' ')               // remove weird brackets
        .replace(regex.whiteSpaceStripper, `$2`)    // remove leading+trailing whitespace
      )[0] || '';

  // @Override
  expansionFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.expansionSelector)]
      .map(node => node.innerHTML.replace(/.*\[(.*)\]/g, `$1`))[0] || '';

  // @Override
  stockFromResultNode = (resultNode) => {
    // Only in stock results are shown
    return { text: 'In Stock', value: 1 };
  }

}

export default Model_NerdShak;
