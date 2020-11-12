import axios from 'axios';
import { cors, regex, seller } from "./utils";

class ModelChaosCards {

  parser = new DOMParser();

  name = seller.chaos.name;
  logo = seller.chaos.logo;
  baseUrl = 'https://www.chaoscards.co.uk/';
  searchPath = 'search/';
  searchSuffix = '#/embedded/query=raven%20familiar&page=1&filter%5Bavailability%5D=In%20stock&lang=en&skuFld=id&query_name=match_and';
  colonSplitter = /^([\s\S]*):\s([\s\S]*)$/; // returns the groups separated by ": "
  firstMajusculeString = /^[^A-Z]*([A-Z'\s]*)\s[^A-Z]?/;

  search = async (searchTerm) => {
    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);
    resultNodes.forEach(resultNode => {
      foundItems.push({
        name: this.name,
        logo: this.logo,
        title: this.nameFromResultNode(resultNode),
        price: this.priceFromResultNode(resultNode),
        stock: this.stockFromResultNode(resultNode),
        imgSrc: this.imgSrcFromResultNode(resultNode),
        productRef: this.baseUrl + this.productRefFromResultNode(resultNode),
        expansion: this.expansionFromResultNode(resultNode),
      });
    });
    return foundItems;
  }

  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm)).catch(() => []);

  searchTermToUrl = searchTerm => cors + this.baseUrl + this.searchPath +
    searchTerm.toLowerCase().split(' ').join('%20') + this.searchSuffix;

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('div.df-embedded__content > div.df-main > div.df-results > div.df-card')
      });
  }

  nameFromResultNode = (resultNode) => {
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
        arr.push(node.getAttribute('href'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('a > div.df-card__content > div.df-card__title')
      .forEach(node => {
        let str = node.innerHTML.replace(this.colonSplitter, `$2`).replace(this.firstMajusculeString, `$1`);
        arr.push(str);
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

}

export default ModelChaosCards;
