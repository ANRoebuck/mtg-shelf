import { cors, identityFunction, postCurrencyText, preDashText, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';


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
      nameSelector: 'div > p.productTitle',
      priceSelector: 'div > div.hoverMask > div > div.addNow > p',
      priceToDisplayFromPriceText: postCurrencyText,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div > div > img.soldout',
      stockValueFromStockText: identityFunction,
      isFoilSelector: 'div > p.productTitle',
      imgSelector: 'div > div.imgWrapper > img.items-even',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div > div > div.view > a',
      productBaseUrl: 'https://nerdshak.com',
      productRefAttribute: 'href',
      expansionSelector: 'div > p.productTitle',
      conditionToDisplayFromPriceText: preDashText,
    });
  }

  // @Override
  titleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.nameSelector)]
      .map(node => node.innerHTML
        .replace(/(.*)\[.*/g, `$1`)                 // take first segment before opening [
        .replace(/<br>/, '')                        // remove linebreak html
        .replace(regex.whiteSpaceStripper, `$2`)    // remove leading+trailing whitespace
        .replace(regex.brackets, ' ')               // remove weird brackets
      )[0] || '';

  // @Override
  expansionFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.expansionSelector)]
      .map(node => node.innerHTML.replace(/.*\[(.*)\]/g, `$1`))[0] || '';

  // @Override
  stockFromResultNode = (resultNode) => {
    // Stock count is not displayed. An out of stock banner either is or is not present.
    let isInStock = resultNode.querySelectorAll(this.stockSelector).length === 0;
    let text = isInStock ? 'In Stock' : 'Out of Stock';
    let value = isInStock ? 1 : 0;
    return { text, value };
  }

}

export default Model_NerdShak;
