import axios from 'axios';

class ModelChaosCards {

  parser = new DOMParser();

  seller = 'Chaos Cards';
  cors = 'https://cors-anywhere.herokuapp.com/';
  baseUrl = 'https://www.chaoscards.co.uk/';
  searchPath = 'search/';
  whitespaceStripper = /([\s]*)(\S[\s\S]*\S)([\s]*)/;
  perverseStripper = /^([\s\S]*):\s([\s\S]*)$/; // returns the groups separated by ": "

  search = async (searchTerm) => {
    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);
    console.log(resultNodes.length);
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
    + searchTerm.toLowerCase().split(' ').join('-');

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
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

  stockFromResultNode = (resultNode) => {
    let arr =[];
    resultNode.querySelectorAll('div.inner > div > div.meta > span.offers > span.qty')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return null;
  }

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