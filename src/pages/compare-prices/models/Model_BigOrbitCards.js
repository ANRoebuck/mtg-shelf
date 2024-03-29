import { seller } from '../utils/enums';
import { cors, textToDigits } from '../utils/utils';
import AbstractModel from './AbstractModel';
import AbstractDataGetter from './AbstractDataGetter';
import AbstractDataProcessor from './AbstractDataProcessor';
import AbstractProcessorSelector from './AbstractProcessorSelector';


class Model_BigOrbitCards extends AbstractModel {

  constructor() {
    super({
      name: seller.bigOrbit.name,
      logo: seller.bigOrbit.logo,
      dataGetter: new DataGetter_BigOrbit(),
      processorSelector: new ProcessorSelector_BigOrbit(),
    });
  }

}

class DataGetter_BigOrbit extends AbstractDataGetter {
  constructor() {
    super({
      cors: cors,
      baseUrl: 'https://www.bigorbitcards.co.uk/',
      searchPath: '?match=all&subcats=Y&pcode_from_q=N&pshort=N&pfull=N&pname=Y&pkeywords=N&search_performed=Y&product_variants=N&q=',
      searchSuffix: '&dispatch=products.search',
      searchJoin: '+',
    });
  }
}

class ProcessorSelector_BigOrbit extends AbstractProcessorSelector {
  constructor() {
    super({
      dataProcessor: new DataProcesor_BigOrbit(),
    });
  }
}


const textStringFromInnerHtml = /(.|\n)*£([0-9]+).([0-9]{2})[\D]*/;

class DataProcesor_BigOrbit extends AbstractDataProcessor {
  constructor() {
    super({
      resultSelector: 'div > div.ty-pagination-container > div.ty-compact-list > div.ty-compact-list__item',
      titleSelector: 'form > div.compact_title_add_to_cart_header > bdi > a',

      priceSelector: 'form > div.ty-compact-list__content > div.ty-compact-list__controls.compact_list_add_to_cart > div > div > span > span:nth-child(2)',
      priceToDisplayFromPriceText: (text) => {
        const transformedText = text ? text.replace(textStringFromInnerHtml, `£$2.$3`) : null;
        return isNaN(textToDigits(transformedText)) ? null : transformedText;
      },
      priceValueFromPriceText: (text) => text ? parseInt(text.replace(textStringFromInnerHtml, `$2$3`)) : 9999,

      stockSelector: 'form > div.ty-compact-list__content > div.ty-compact-list__controls.compact_list_add_to_cart > div > div > span > span:nth-child(2)',
      stockValueFromStockText: (text) => text === '[no such message]' ? 0 : parseInt(text.replace(/[\D]*([0-9]+)[\D]*£([0-9]+).([0-9]{2})[\D]*/, `$1`)),
      isFoilSelector: 'form > div.compact_title_add_to_cart_header > bdi > a',
      expansionSelector: 'form > div.compact_title_add_to_cart_header > span > span.ty-control-group__item',

      imgSelector: 'form > div.ty-compact-list__content > div.ty-compact-list__image > label > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',

      productSelector: 'form > div.ty-compact-list__content > div.ty-compact-list__image > label > a',
      productBaseUrl: '',
      productRefAttribute: 'href',
    });
  }
}



export default Model_BigOrbitCards;
