import axios from 'axios';
import { cors, regex, seller } from "./utils";

class ModelChaosCards {

  parser = new DOMParser();

  name = seller.chaos.name;
  logo = seller.chaos.logo;
  baseUrl = 'https://www.chaoscards.co.uk/';
  searchPath = 'search/';
  perverseStripper = /^([\s\S]*):\s([\s\S]*)$/; // returns the groups separated by ": "

  search = async (searchTerm) => {
    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);
    console.log(resultNodes.length);
    resultNodes.forEach(resultNode => {
      foundItems.push({
        name: this.name,
        logo: this.logo,
        title: this.nameFromResultNode(resultNode),
        price: this.priceFromResultNode(resultNode),
        stock: this.stockFromResultNode(resultNode),
        imgSrc: this.imgSrcFromResultNode(resultNode),
        expansion: this.expansionFromResultNode(resultNode),
      });
    });
    return foundItems;
  }

  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm));

  searchTermToUrl = searchTerm => cors + this.baseUrl + this.searchPath + searchTerm.toLowerCase().split(' ').join('-');

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('div#search_results_grid > div#search_results_products > div.product')
      });
  }

  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.product_details > div.product_title > a.product_title')
      .forEach(node => {
        node.firstChild.remove();
        let str = node.innerHTML.replace(this.perverseStripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll(
      'div.product_details > div > div.product_price > span > span.price > span.inc > span.GBP')
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
    resultNode.querySelectorAll('div.product_hover > div.product_hover_title > div.stock_levels')
      .forEach(node => {
        const text = node.innerHTML.replace(regex.whitespaceStripper, `$2`);
        arr.push({
          text,
          value: this.stockValueFromStockText(text),
        });
      });
    arr.push({text: 'Out of Stock', value: 0});
    return arr[0];
  }
  stockValueFromStockText = (text) =>
    text === 'Sorry Item out of Stock' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`));

  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('ul > li.product_image > a > img')
      .forEach(node => {
        arr.push(this.baseUrl + node.getAttribute('src'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    const extremelyPerverseStripper = /^([^A-Z]*\s)([\w\W]*?)(\s[A-Z][a-z])([\s\S]*)$/;
    resultNode.querySelectorAll('div.product_details > div.product_title > a.product_title')
      .forEach(node => {
        let str = node.innerHTML.replace(extremelyPerverseStripper, `$2`);
        arr.push(str);
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

}

export default ModelChaosCards;