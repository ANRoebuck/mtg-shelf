import { cors, identityFunction, postCurrencyText, preDashText, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './abstract/AbstractModel';
import AbstractDataGetter from './abstract/AbstractDataGetter';
import AbstractDataProcessor from './abstract/AbstractDataProcessor';
import AbstractProcessorSelector from './abstract/AbstractProcessorSelector';


class Model_LondonMagicTraders extends AbstractModel {
  constructor() {
    super({
      name: seller.londonMagic.name,
      logo: seller.londonMagic.logo,
      dataGetter: new DataGetter_LondonMagicTraders(),
      processorSelector: new ProcessorSelector_NerdShak(),
    });
  }
}

class DataGetter_LondonMagicTraders extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://londonmagictraders.com/',
      searchPath: 'search?q=*',
      searchSuffix: '*',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_NerdShak extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_LondonMagicTraders(),
    });
  }
}

class DataProcessor_LondonMagicTraders extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div > div.row > div.col-md-4',
      titleSelector: 'div > p.productTitle',

      priceSelector: 'div > p.productPrice',
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
      productBaseUrl: 'https://londonmagictraders.com',
      productRefAttribute: 'href',


      conditionToDisplayFromPriceText: preDashText,
    });
  }

  // @Override
  titleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.titleSelector)]
      .map(node => node.innerHTML
        .replace(/(.*)[-~](.*)/, `$1`)              // pre-dash text
        .replace(regex.whiteSpaceStripper, `$2`)    // remove leading+trailing whitespace
      )[0] || '';

  // @Override
  expansionFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.expansionSelector)]
      .map(node => node.innerHTML
        .replace(/(.*)[-~](.*)/, `$2`)              // post-dash text
        .replace(/<br>/, '')                        // remove linebreak html
        .replace(/(.*)\[.*/g, `$1`)                 // take first segment before opening [
        .replace(regex.whiteSpaceStripper, `$2`)    // remove leading+trailing whitespace
      )[0] || '';

  // @Override
  stockFromResultNode = (resultNode) => {
    const { text: priceText } = this.priceFromResultNode(resultNode);
    return priceText === 'Sold Out'
      ? { text: 'Out of Stock', value: 0, }
      : { text: 'In Stock', value:1 };
  }

}

export default Model_LondonMagicTraders;
