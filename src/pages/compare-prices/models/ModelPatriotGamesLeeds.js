import axios from 'axios';
import { cors, regex, seller } from "./utils";

class ModelPatriotGamesLeeds {

  constructor() {
    this.parser = new DOMParser();
    this.name = seller.pgLeeds.name;
    this.logo = seller.pgLeeds.logo;
    this.baseUrl = 'http://www.patriotgamesleeds.com/';
    this.searchPath = 'index.php?main_page=advanced_search_result&search_in_description=1&keyword=';
  }

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
        productRef: this.productRefFromResultNode(resultNode),
        expansion: this.expansionFromResultNode(resultNode),
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
        return document.querySelectorAll('#productListing > table > tbody> tr')
      });
  }

  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('td > h3.itemTitle > a')
      .forEach(node => {
        let str = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        arr.push(str);
      });
    arr.push('');
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('td.productListing-data > span.productBasePrice')
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
    resultNode.querySelectorAll('td[align="right"] > a')
      .forEach(node => {
        const text = node.innerHTML === '... more info' ? "Out of Stock" : "In Stock";
        arr.push({
          text,
          value: this.stockValueFromStockText(text),
        });
      });
    arr.push({text: 'In Stock', value: 1});
    return arr[0];
  }
  stockValueFromStockText = (text) => text === 'Out of Stock' ? 0 : 1;

  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('td.productListing-data > a > img')
      .forEach(node => {
        arr.push(this.baseUrl + node.getAttribute('src'));
      });
    return arr[0];
  }

  productRefFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('td.productListing-data > a')
      .forEach(node => {
        arr.push(node.getAttribute('href'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('td.productListing-data > div.listingDescription')
      .forEach(node => {
        let r = /.*Set\:(.*)Rarity.*/;
        arr.push(node.innerHTML.replace(r, `$1`));
      });
    return arr[0];
  }

}

export default ModelPatriotGamesLeeds;
