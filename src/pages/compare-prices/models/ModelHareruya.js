import { identityFunction, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelHareruya extends AbstractModel {

  constructor() {
    super({
      name: seller.hareruya.name,
      logo: seller.hareruya.logo,
      baseUrl: 'https://www.hareruyamtg.com/en/',
      searchPath: 'products/search?suggest_type=all&product=',
      searchSuffix: '&image=%EE%A4%84',
      searchJoin: '+',
      resultSelector: 'ul.itemListLine > li.itemList',
      nameSelector: 'div.itemData > a',
      priceSelector: 'div.itemData > div.itemDetail > p.itemDetail__price',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.itemData > div.itemDetail > p.itemDetail__stock',
      stockValueFromStockText: textToDigits,
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
  nameFromResultNode = (resultNode) =>
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

export default ModelHareruya;
