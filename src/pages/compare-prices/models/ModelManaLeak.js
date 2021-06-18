
import axios from 'axios';
import { cors, regex, seller } from "./utils";

class ModelManaLeak {

  constructor() {
    this.parser = new DOMParser();
    this.name = seller.manaLeak.name;
    this.logo = seller.manaLeak.logo;
    this.baseUrl = 'https://www.manaleak.com/';
    this.searchPath = '/index.php?route=product/search&search=';
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

  searchTermToUrl = searchTerm => cors + this.baseUrl + this.searchPath +
    searchTerm.toLowerCase().split(' ').join('+');

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('div.main-products > div.product-list-item');
      });
  }

  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.caption > div.name > a')
      .forEach(node => {
        let str = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.caption > div.price')
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
    // Stock count is not displayed. An out of stock spanner either is or is not present.

    let isInStock = resultNode.querySelectorAll('div.image > span.label-outofstock').length === 0;
    let text = isInStock ? 'In Stock' : 'Out of Stock';
    let value = isInStock ? 9999 : 0;
    return { text, value };
  }

  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.image > a > img')
      .forEach(node => {
        arr.push(node.getAttribute('data-src'));
      });
    return arr[0];
  }

  productRefFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.image > a')
      .forEach(node => {
        arr.push(node.getAttribute('href'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.caption > div.description > p > a')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

  isFoilFromTitle = (title) => {
    return title.toLowerCase().includes('foil');
  }

}

export default ModelManaLeak;
