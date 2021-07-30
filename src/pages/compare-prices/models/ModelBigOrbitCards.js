import { regex } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelBigOrbitCards extends AbstractModel{

  constructor() {
    super({
      name: seller.bigOrbit.name,
      logo: seller.bigOrbit.logo,
      baseUrl: 'https://www.bigorbitcards.co.uk/',
      searchPath: '?match=all&subcats=Y&pcode_from_q=N&pshort=N&pfull=N&pname=Y&pkeywords=N&search_performed=Y&product_variants=N&q=',
      searchSuffix: '&dispatch=products.search',
      searchJoin: '+',
      resultSelector: 'div > div.ty-pagination-container > div.ty-compact-list > div.ty-compact-list__item',
      nameSelector: 'form > div.compact_title_add_to_cart_header > bdi > a',
      priceSelector: 'form > div.ty-compact-list__content > div.ty-compact-list__controls.compact_list_add_to_cart > div > div > span > span:nth-child(2)',
      priceToDisplayFromPriceText: (text) => text ? text.replace(/[\D]*([0-9]+)[\D]*£([0-9]+).([0-9]{2})[\D]*/, `£$2.$3`) : null,
      priceValueFromPriceText: (text) => text ? parseInt(text.replace(/[\D]*([0-9]+)[\D]*£([0-9]+).([0-9]{2})[\D]*/, `$2$3`)) : 9999,
      stockSelector: 'form > div.ty-compact-list__content > div.ty-compact-list__controls.compact_list_add_to_cart > div > div > span > span:nth-child(2)',
      stockValueFromStockText: (text) => text === '[no such message]' ? 0 : parseInt(text.replace(/[\D]*([0-9]+)[\D]*£([0-9]+).([0-9]{2})[\D]*/, `$1`)),
      imgSelector: 'form > div.ty-compact-list__content > div.ty-compact-list__image > label > a > picture > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'form > div.ty-compact-list__content > div.ty-compact-list__image > label > a',
      productBaseUrl: '',
      productRefAttribute: 'href',
      expansionSelector: 'form > div.compact_title_add_to_cart_header > span > span.ty-control-group__item',
    });
  }

}

export default ModelBigOrbitCards;
