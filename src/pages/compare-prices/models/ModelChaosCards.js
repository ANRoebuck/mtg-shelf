import { regex } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelChaosCards extends AbstractModel {

  constructor() {
    super({
      name: seller.chaos.name,
      logo: seller.chaos.logo,
      baseUrl: 'https://www.chaoscards.co.uk/',
      searchPath: 'search/',
      searchSuffix: '#/embedded/query=raven%20familiar&page=1&filter%5Bavailability%5D=In%20stock&lang=en&skuFld=id&query_name=match_and',
      searchJoin: '%20',
    });
  }

  search = async (searchTerm) => {

    const cachedResults = this.readCachedResults(this.name, searchTerm);
    if (cachedResults) return cachedResults;

    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);

    resultNodes.forEach(resultNode => {

      let name = this.name;
      let logo = this.logo;
      let title = this.titleFromResultNode(resultNode);
      let price = this.priceFromResultNode(resultNode);
      let stock = this.stockFromResultNode(resultNode);
      let imgSrc = this.imgSrcFromResultNode(resultNode);
      let productRef = this.productRefFromResultNode(resultNode);
      let expansion = this.expansionFromResultNode(resultNode);
      let isFoil = this.isFoilFromTitle(title);

      foundItems.push({
        name,
        logo,
        title,
        price,
        stock,
        imgSrc,
        productRef,
        expansion,
        isFoil,
      });

    });

    this.cacheResults(this.name, searchTerm, foundItems);

    return foundItems;
  }

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('div.df-embedded__content > div.df-main > div.df-results > div.df-card')
      });
  }

  titleFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('a > div.df-card__content > div.df-card__title')
      .forEach(node => {
        node.firstChild.remove();
        let str = node.innerHTML.replace(this.colonSplitter, `$1`);
        arr.push(str);
      });
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('a > div.df-card__content > div.df-card__pricing > span')
      .forEach(node => {
        const text = node.innerHTML;
        arr.push({
          text,
          value: this.priceValueFromPriceText(text),
        });
      });
    arr.push({text: '', value: 9999});
    return arr[0];
  }
  priceValueFromPriceText = (text) => text ? parseInt(text.replace(/[£.]/g, ``)) : 9999;

  stockFromResultNode = (resultNode) => {
    let arr = [];
    // resultNode.querySelectorAll('div.product_hover > div.product_hover_title > div.stock_levels')
    //   .forEach(node => {
    //     const text = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
    //     arr.push({
    //       text,
    //       value: this.stockValueFromStockText(text),
    //     });
    //   });
    arr.push({text: 'In Stock', value: 1});
    arr.push({text: 'Out of Stock', value: 0});
    return arr[0];
  }
  stockValueFromStockText = (text) => text === 'Out of Stock' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`));

  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('a > figure.df-card__image > img')
      .forEach(node => {
        arr.push(node.getAttribute('src'));
      });
    return arr[0];
  }

  productRefFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('a')
      .forEach(node => {
        arr.push(this.baseUrl + node.getAttribute('href'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('a > div.df-card__content > div.df-card__title')
      .forEach(node => {
        let str = node.innerHTML.replace(regex.colonSplitter, `$2`).replace(regex.firstMajusculeString, `$1`);
        arr.push(str);
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

}

export default ModelChaosCards;
