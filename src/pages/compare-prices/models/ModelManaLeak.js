import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import { identityFunction, textToDigits } from "../utils/utils";

class ModelManaLeak extends AbstractModel {

  constructor() {
    super({
      name: seller.manaLeak.name,
      logo: seller.manaLeak.logo,
      baseUrl: 'https://www.manaleak.com/',
      searchPath: '/index.php?route=product/search&search=',
      searchSuffix: '',
      searchJoin: '+',
      resultSelector: 'div.main-products > div.product-list-item',
      nameSelector: 'div.caption > div.name > a',
      priceSelector: 'div.caption > div.price',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.image > span.label-outofstock',
      stockValueFromStockText: identityFunction,
      imgSelector: 'div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'data-src',
      productSelector: 'div.image > a',
      productBaseUrl: 'https://www.manaleak.com/',
      productRefAttribute: 'href',
      expansionSelector: 'div.caption > div.description > p > a',
    });
  }

  // @Override
  stockFromResultNode = (resultNode) => {
    // Stock count is not displayed. An out of stock banner either is or is not present.
    let isInStock = resultNode.querySelectorAll('div.image > span.label-outofstock').length === 0;
    let text = isInStock ? 'In Stock' : 'Out of Stock';
    let value = isInStock ? 1 : 0;
    return { text, value };
  }

}

export default ModelManaLeak;
