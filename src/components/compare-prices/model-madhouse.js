import axios from 'axios';

class ModelMadHouse {

  cors = 'https://cors-anywhere.herokuapp.com/';
  baseUrl = 'https://www.magicmadhouse.co.uk/search/';
  parser = new DOMParser();
  whitespacestripper = /([\s]*)(\S[\s\S]*\S)([\s]*)/

  searchTermToUrl = searchTerm => this.cors + this.baseUrl + searchTerm.toLowerCase().split(' ').join('-');
  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm));

  search = async (searchTerm) => {
    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);
    resultNodes.forEach(resultNode => {
      const name = this.nameFromResultNode(resultNode);
      const price = this.priceFromResultNode(resultNode);
      const stock = this.stockFromResultNode(resultNode);
      foundItems.push({name , price, stock});
    });
    return foundItems;
  }

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
        let str = node.innerHTML.replace(this.whitespacestripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div > div > div.product__options > div.product__details__prices > span > span > span > span.GBP')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

  stockFromResultNode = (resultNode) => {
    let arr =[];
    resultNode.querySelectorAll('div > div > div.product__details > div.product__details__stock > span')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }




}

export default ModelMadHouse;