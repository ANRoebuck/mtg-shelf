import axios from 'axios';

class ModelAxion {

  parser = new DOMParser();

  seller = 'Axion';
  cors = 'https://cors-anywhere.herokuapp.com/';
  baseUrl = 'https://www.axionnow.com/';
  searchPath = 'products/search?q=';
  whitespaceStripper = /([\s]*)(\S[\s\S]*\S)([\s]*)/

  search = async (searchTerm) => {
    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);
    resultNodes.forEach(resultNode => {
      foundItems.push({
        seller: this.seller,
        name: this.nameFromResultNode(resultNode),
        price: this.priceFromResultNode(resultNode),
        stock: this.stockFromResultNode(resultNode),
        imgSrc: this.imgSrcFromResultNode(resultNode),
        expansion: this.expansionFromResultNode(resultNode),
      });
    });
    return foundItems;
  }

  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm));

  searchTermToUrl = searchTerm => this.cors + this.baseUrl + this.searchPath
    + searchTerm.toLowerCase().split(' ').join('+');

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('ul.products > li.product')
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
    resultNode.querySelectorAll('div.inner > div > div.meta > div > div > span.variant-buttons > form > div > span.regular')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

  stockFromResultNode = (resultNode) => {
    let arr =[];
    resultNode.querySelectorAll('div.inner > div > div.meta > div > div > span.variant-main-info > span.variant-qty')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.image > a > img')
      .forEach(node => {
        arr.push(node.getAttribute('src'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.meta > a > span.category')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

}

export default ModelAxion;