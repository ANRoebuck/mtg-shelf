import axios from 'axios';
import { cors, regex, seller } from "./utils";

class ModelTrollTrader {

  constructor() {
    this.parser = new DOMParser();
    this.name = seller.trollTrader.name;
    this.logo = seller.trollTrader.logo;
    this.baseUrl = 'https://www.trolltradercards.com/';
    this.searchPath = 'products/search?q=';
  }

  search = async (searchTerm) => {
    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);

    resultNodes.forEach(resultNode => {

      let name = this.name;
      let logo = this.logo;
      let title = this.nameFromResultNode(resultNode);
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

    return foundItems;
  }

  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm)).catch(() => []);

  searchTermToUrl = searchTerm => cors + this.baseUrl + this.searchPath
    + searchTerm.toLowerCase().split(' ').join('+');

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('div.products-container > ul > li.product')
      });
  }

  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.meta > a > h4')
      .forEach(node => {
        let str = node.innerHTML.replace(this.whitespaceStripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.meta > span.offers > span.price')
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
    let arr =[];
    resultNode.querySelectorAll('div.inner > div > div.meta > span.offers > span.qty')
      .forEach(node => {
        const text = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        arr.push({
          text,
          value: this.stockValueFromStockText(text),
        });
      });
    arr.push({text: 'Out of Stock', value: 0});
    return arr[0];
  }
  stockValueFromStockText = (text) => text === undefined ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`));

  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.image > a > img')
      .forEach(node => {
        arr.push(node.getAttribute('src'));
      });
    return arr[0];
  }

  productRefFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.image > a')
      .forEach(node => {
        arr.push(this.baseUrl + node.getAttribute('href'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.meta > span.category')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

  isFoilFromTitle = (title) => {
    return title.toLowerCase().includes('foil');
  }

}

export default ModelTrollTrader;
