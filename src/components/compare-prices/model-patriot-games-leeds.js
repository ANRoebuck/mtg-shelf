import axios from 'axios';

class ModelPatriotGamesLeeds {

  parser = new DOMParser();

  seller = 'Patriot Games - Leeds';
  cors = 'https://cors-anywhere.herokuapp.com/';
  baseUrl = 'http://www.patriotgamesleeds.com/';
  searchPath = 'index.php?main_page=advanced_search_result&search_in_description=1&keyword=';
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
        return document.querySelectorAll('div.productListing > table > tr')
      });
  }

  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('td > h3.itemTitle > a')
      .forEach(node => {
        let str = node.innerHTML.replace(this.whitespaceStripper, `$2`);
        arr.push(str);
      });
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
    return null;
    // let arr =[];
    // resultNode.querySelectorAll('div.inner > div > div.meta > span.offers > span.qty')
    //   .forEach(node => {
    //     const text = node.replace(this.whitespaceStripper, `$2`);
    //     arr.push({
    //       text,
    //       value: this.stockValueFromStockText(text),
    //     });
    //   });
    // arr.push({text: 'Out of stock', value: 0});
    // return arr[0];
  }
  // stockValueFromStockText = (text) => text = 'Item out of Stock' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`));

  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('td.productListing-data > a > img')
      .forEach(node => {
        arr.push(this.baseUrl + node.getAttribute('src'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('td.productListing-data > div.listingDescription')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

}

export default ModelPatriotGamesLeeds;