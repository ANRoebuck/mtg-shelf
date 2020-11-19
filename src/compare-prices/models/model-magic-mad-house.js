import axios from 'axios';
import { cors, regex, seller } from "./utils";

class ModelMagicMadHouse {

  parser = new DOMParser();

  name = seller.magicMadhouse.name;
  logo = seller.magicMadhouse.logo;
  baseUrl = 'https://www.magicmadhouse.co.uk/';
  searchPath = 'search/';

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

  searchTermToUrl = searchTerm => cors + this.baseUrl + this.searchPath
    + searchTerm.toLowerCase().split(' ').join('-');

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('div.search-results-products > ul > li')
      });
  }

  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div > div > div.product__details > div.product__details__title > a')
      .forEach(node => {
        node.firstChild.remove();
        node.firstChild.remove();
        let str = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div > div > div.product__options > div.product__details__prices > span > span > span > span.GBP')
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
    resultNode.querySelectorAll('div > div > div.product__details > div.product__details__stock > span')
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
  stockValueFromStockText = (text) => text === 'Item out of Stock' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`));


  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div > div.product__image > a > img')
      .forEach(node => {
        arr.push(this.baseUrl + node.getAttribute('data-src'));
      });
    return arr[0];
  }

  productRefFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div > div.product__image > a')
      .forEach(node => {
        arr.push(node.getAttribute('href'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    // let arr = [];
    // resultNode.querySelectorAll('div.inner > div > div.meta > a > span.category')
    //   .forEach(node => {
    //     arr.push(node.innerHTML);
    //   });
    // return arr[0];
    return null;
  }

}

export default ModelMagicMadHouse;
