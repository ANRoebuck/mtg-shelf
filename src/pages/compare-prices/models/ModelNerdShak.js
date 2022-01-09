import { identityFunction, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelNerdShak extends AbstractModel {

  constructor() {
    super({
      name: seller.nerdShak.name,
      logo: seller.nerdShak.logo,
      baseUrl: 'https://nerdshak.com/',
      searchPath: 'search?q=*',
      searchSuffix: '*',
      searchJoin: '+',
      resultSelector: 'div > div.row > div.col-md-4',
      nameSelector: 'div > p.productTitle',
      priceSelector: 'div > p.productPrice',
      priceToDisplayFromPriceText: identityFunction,
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

export default ModelNerdShak;
