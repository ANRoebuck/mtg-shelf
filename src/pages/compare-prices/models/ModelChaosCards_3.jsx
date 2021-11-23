import { identityFunction, regex, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelChaosCards_3 extends AbstractModel {

  constructor() {
    super({
      name: seller.chaos.name,
      logo: seller.chaos.logo,
      baseUrl: 'https://eu1-search.doofinder.com/5/search?hashid=e335ee744310ac28c6e30f4083912586&query_counter=1&page=1&rpp=30&filter[availability]=In%20stock&transformer=basic&query=',
      searchPath: '',
      searchSuffix: '',
      searchJoin: '%20',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
    });
    this.isMagicCard = ' - Magic the Gathering Single Card';
    this.fetchConfig = { headers: { "Referrer-Policy" : "no-referrer-when-downgrade" } };

  }

  // Override
  getHtml = (searchTerm) => fetch(this.searchTermToUrl(searchTerm), this.fetchConfig)

  // @Override
  allResults = async (searchTerm) =>
    this.getHtml(searchTerm)
      .then(response => response.json())
      .then((data) => data.results || []);

  // @Override
  titleFromResultNode = ({ title }) => title.replace(regex.colonSplitter, `$1`).replace(regex.whiteSpaceStripper, `$2`);
  isFoilFromResultNode = (resultNode) => this.isFoilFromTitle(this.titleFromResultNode(resultNode));
  priceFromResultNode = ({ price }) => ({
      text: "£ " + this.priceToDisplayFromPriceText(price),
      value: this.priceValueFromPriceText(`${price}`),
    });
  stockFromResultNode = () => ({ value: 1, text: 'In Stock'});
  imgSrcFromResultNode = ({ image_link }) => image_link;
  productRefFromResultNode = ({ link }) => link;
  expansionFromResultNode = (resultNode) => resultNode.title.replace(regex.colonSplitter, `$2`).replace(this.isMagicCard, '');

}

export default ModelChaosCards_3;
