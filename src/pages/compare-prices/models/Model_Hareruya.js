import { cors, identityFunction, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';

class Model_Hareruya extends AbstractModel {
  constructor() {
    super({
      name: seller.hareruya.name,
      logo: seller.hareruya.logo,
      dataGetter: new DataGetter_Hareruya(),
      processorSelector: new ProcessorSelector_Hareruya(),
    });
  }
}

class DataGetter_Hareruya extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.hareruyamtg.com/en/',
      searchPath: 'products/search?suggest_type=all&product=',
      searchSuffix: '&image=%EE%A4%84',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_Hareruya extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcessor_Hareruya(),
    });
  }
}

class DataProcessor_Hareruya extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'ul.itemListLine > li.itemList',
      nameSelector: 'div.itemData > a',
      priceSelector: 'div.itemData > div.itemDetail > p.itemDetail__price',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.itemData > div.itemDetail > p.itemDetail__stock',
      stockValueFromStockText: textToDigits,
      isFoilSelector: 'div.itemData > a',
      imgSelector: 'a> div.itemImg > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'data-original',
      productSelector: 'div.itemData > a',
      productBaseUrl: 'https://www.hareruyamtg.com',
      productRefAttribute: 'href',
      expansionSelector: 'div.itemData > a',
    });
  }

  // @Override
  titleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.nameSelector)]
      .map(node => node.innerHTML
        .replace(/(.*)\[.*/g, `$1`)                 // take first segment before opening [
        .replace(regex.whiteSpaceStripper, `$2`)    // remove leading+trailing whitespace
        .replace(regex.brackets, ' ')               // remove weird brackets
      )[0] || '';

  // @Override
  expansionFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.expansionSelector)]
      .map(node => node.innerHTML.replace(/.*\[(.*)\]/g, `$1`))[0] || '';
}

export default Model_Hareruya;
