import { identityFunction } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';
import axios from "axios";

class ModelStarCityGames extends AbstractModel {

  constructor() {
    super({
      name: seller.starCityGames.name,
      logo: seller.starCityGames.logo,
      baseUrl: 'https://starcitygames.hawksearch.com/',
      searchPath: 'sites/starcitygames/?search_query=',
      searchSuffix: '&ajax=1&json=1&hawkcustom=undefined&hawkvisitorid=foo&callback=jQuery3410974876865918253_1633569817522&_=1633569817523',
      searchJoin: '%20',
      resultSelector: 'div > .hawk-results-item',
      nameSelector: 'div > div > div > h2 > a',
      priceSelector: 'div.hawk-results-item__options-table-cell.hawk-results-item__options-table-cell--price.childAttributes',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: (text) => text ? parseInt(text.replace(/[£.]/g, ``)) : 9999,
      stockSelector: 'div.hawk-results-item__options-table-cell.hawk-results-item__options-table-cell--qty.childAttributes',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      imgSelector: 'div > div > div > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div > div > div > h2 > a',
      productBaseUrl: 'https://starcitygames.com',
      productRefAttribute: 'href',
      expansionSelector: 'div > div > p > a',
    });
  }

  // @Override
  getHtml = (searchTerm) => axios
    .get(this.searchTermToUrl(searchTerm))
    .then(({ data }) => {
      let str = data.replace(/.*\(({.*})\)/, `$1`);
      let o = JSON.parse(str);
      return { data: o.html };
    })
    .catch(() => ({data: ''}));

}

export default ModelStarCityGames;
