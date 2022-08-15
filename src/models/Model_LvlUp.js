import { cors, identityFunction, postCurrencyText, preDashText, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './abstract/AbstractModel';
import AbstractDataGetter from './abstract/AbstractDataGetter';
import AbstractDataProcessor from './abstract/AbstractDataProcessor';
import AbstractProcessorSelector from './abstract/AbstractProcessorSelector';


class Model_LvlUp extends AbstractModel {
  constructor() {
    super({
      name: seller.lvlUp.name,
      logo: seller.lvlUp.logo,
      dataGetter: new DataGetter_LvlUp(),
      processorSelector: new ProcessorSelector_LvlUp(),
    });
  }
}

class DataGetter_LvlUp extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://lvlupgaming.co.uk/',
      searchPath: 'search?q=*',
      searchSuffix: '*',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_LvlUp extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_LvlUp(),
    });
  }
}

class DataProcessor_LvlUp extends AbstractDataProcessor {
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
      productBaseUrl: 'https://lvlupgaming.co.uk',
      productRefAttribute: 'href',
    });
  }

  // @Override
  titleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.titleSelector)]
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
    // Only in stock results are shown
    return { text: 'In Stock', value: 1 };
  }
}

export default Model_LvlUp;
