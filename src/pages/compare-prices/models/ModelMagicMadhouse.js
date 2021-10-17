import { identityFunction, nullifyingFunction, regex } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelMagicMadhouse extends AbstractModel {

  constructor() {
    super({
      name: seller.magicMadhouse.name,
      logo: seller.magicMadhouse.logo,
      baseUrl: 'https://www.magicmadhouse.co.uk/',
      searchPath: 'search.php?search_query=',
      searchSuffix: '',
      searchJoin: '-',
      resultSelector: 'div.search-results-products > ul > li',
      nameSelector: 'div > div > div.product__details > div.product__details__title > a',
      priceSelector: 'div > div > div.product__options > div.product__details__prices > span > span > span > span.GBP',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: (text) => text ? parseInt(text.replace(/[£.]/g, ``)) : 9999,
      stockSelector: 'div > div > div.product__details > div.product__details__stock > span',
      stockValueFromStockText: (text) => text === 'Item out of Stock' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      imgSelector: 'div > div.product__image > a > img',
      imgBaseUrl: 'https://www.magicmadhouse.co.uk/',
      imgSrcAttribute: 'data-src',
      productSelector: 'div > div.product__image > a',
      productBaseUrl: 'https://www.magicmadhouse.co.uk/',
      productRefAttribute: 'href',
      expansionSelector: 'expansion is not displayed'
    });
  }

  // @Override
  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div > div > div.product__details > div.product__details__title > a')
      .forEach(node => {
        node.firstChild.remove();
        node.firstChild.remove();
        let str = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  // @Override
  expansionFromResultNode = nullifyingFunction;

}

export default ModelMagicMadhouse;
