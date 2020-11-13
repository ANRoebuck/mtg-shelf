import axios from 'axios';
import { cors, regex, seller } from "./utils";

class ModelBigOrbitCards {

  parser = new DOMParser();

  name = seller.bigOrbit.name;
  logo = seller.bigOrbit.logo;
  baseUrl = 'https://www.bigorbitcards.co.uk/';
  searchPath = '?match=all&subcats=Y&pcode_from_q=N&pshort=N&pfull=N&pname=Y&pkeywords=N&search_performed=Y&product_variants=N&q=';
  searchSuffix = '&dispatch=products.search';

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
    + searchTerm.toLowerCase().split(' ').join('+') + this.searchSuffix;

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('div > div.ty-pagination-container > div.ty-compact-list > div.ty-compact-list__item')
      });
  }

  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('form > div.compact_title_add_to_cart_header > bdi > a')
      .forEach(node => {
        let str = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('form > div.ty-compact-list__content > div.ty-compact-list__controls.compact_list_add_to_cart > div > div > span > span:nth-child(2)')
      .forEach(node => {
        const text = node.innerHTML;
        console.log(text);
        console.log(this.priceValueFromPriceText(text));
        console.log(this.priceDisplayFromPriceText(text));
        arr.push({
          text: this.priceDisplayFromPriceText(text),
          value: this.priceValueFromPriceText(text),
        });
      });
    arr.push({text: '', value: 9999});
    return arr[0];
  }
  priceDisplayFromPriceText = (text) => text ? text.replace(/[\D]*([0-9]+)[\D]*£([0-9]+).([0-9]{2})[\D]*/, `£$2.$3`) : null;
  priceValueFromPriceText = (text) => text ? parseInt(text.replace(/[\D]*([0-9]+)[\D]*£([0-9]+).([0-9]{2})[\D]*/, `$2$3`)) : 9999;

  stockFromResultNode = (resultNode) => {
    let arr =[];
    resultNode.querySelectorAll('form > div.ty-compact-list__content > div.ty-compact-list__controls.compact_list_add_to_cart > div > div > span > span:nth-child(2)')
      .forEach(node => {
        const text = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        const stock = this.stockValueFromStockText(text);
        arr.push({
          text: stock + ' in Stock',
          value: stock,
        });
      });
    arr.push({text: 'Out of Stock', value: 0});
    return arr[0];
  }
  stockValueFromStockText = (text) => text === '[no such message]' ? 0 : parseInt(text.replace(/[\D]*([0-9]+)[\D]*£([0-9]+).([0-9]{2})[\D]*/, `$1`));


  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('form > div.ty-compact-list__content > div.ty-compact-list__image > a > img')
      .forEach(node => {
        arr.push(node.getAttribute('src'));
      });
    return arr[0];
  }

  productRefFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('form > div.ty-compact-list__content > div.ty-compact-list__image > a')
      .forEach(node => {
        arr.push(node.getAttribute('href'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('form > div.compact_title_add_to_cart_header > span > span.ty-control-group__item')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
    return null;
  }

}

export default ModelBigOrbitCards;
