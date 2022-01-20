import { regex, removeDiacritics } from '../utils/utils';


class AbstractDataProcessor {

  constructor({
                resultSelector, nameSelector, priceSelector, priceToDisplayFromPriceText, priceValueFromPriceText,
                stockSelector, stockValueFromStockText, isFoilSelector, imgSelector, imgBaseUrl, imgSrcAttribute,
                productSelector, productBaseUrl, productRefAttribute, expansionSelector, conditionToDisplayFromPriceText
              }) {

    this.parser = new DOMParser();

    this.resultSelector = resultSelector;
    this.nameSelector = nameSelector;
    this.priceSelector = priceSelector;
    this.priceToDisplayFromPriceText = priceToDisplayFromPriceText;
    this.priceValueFromPriceText = priceValueFromPriceText;
    this.stockSelector = stockSelector;
    this.stockValueFromStockText = stockValueFromStockText;
    this.isFoilSelector = isFoilSelector;
    this.imgSelector = imgSelector;
    this.imgBaseUrl = imgBaseUrl;
    this.imgSrcAttribute = imgSrcAttribute;
    this.productSelector = productSelector;
    this.productBaseUrl = productBaseUrl;
    this.productRefAttribute = productRefAttribute;
    this.expansionSelector = expansionSelector;
    this.conditionToDisplayFromPriceText = conditionToDisplayFromPriceText;

  }

  processData = (data) => {

    const processedResults = [];

    const resultNodes = this.dataToResultsArray(data);

    resultNodes.forEach(resultNode => {

      let prices = this.pricesFromResultNode(resultNode);
      prices = prices.length > 0 ? prices : [{ text: '', value: 9999 }];
      // console.log(prices)

      const title = this.titleFromResultNode(resultNode) + this.conditionFromResultNode(resultNode);
      const stock = this.stockFromResultNode(resultNode);
      const imgSrc = this.imgSrcFromResultNode(resultNode);
      const productRef = this.productRefFromResultNode(resultNode);
      const expansion = this.expansionFromResultNode(resultNode);
      const isFoil = this.isFoilFromTitle(title) || this.isFoilFromResultNode(resultNode);

      const otherData = {
        title,
        stock,
        imgSrc,
        productRef,
        expansion,
        isFoil,
      }

      prices.forEach(price => {
        processedResults.push({
          ...otherData,
          price,
        });
      });

    });

    return processedResults;

  }


  dataToResultsArray = (data) => {
    const document = this.parser.parseFromString(data, "text/html");
    return document.querySelectorAll(this.resultSelector);
  }


  pricesFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.priceSelector)]
      .map(node => {
        const nodeText = node.innerHTML;
        return {
          text: this.priceToDisplayFromPriceText(nodeText).replace(regex.whiteSpaceStripper, `$2`),
          value: this.priceValueFromPriceText(nodeText),
        };
      }) || [{text: '', value: 9999}];


  titleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.nameSelector)]
      .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`))[0] || '';


  stockFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.stockSelector)]
      .map(node => {
        const nodeText = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        const value = this.stockValueFromStockText(nodeText);
        return {
          value,
          text: value > 0 ? value + ' in Stock' : 'Out of Stock',
        };
      })[0] || {text: 'Out of Stock', value: 0};


  imgSrcFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.imgSelector)]
      .map(node => this.imgBaseUrl + node.getAttribute(this.imgSrcAttribute))[0] || null;


  productRefFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.productSelector)]
      .map(node => this.productBaseUrl + node.getAttribute(this.productRefAttribute).replace(regex.whiteSpaceStripper, `$2`))[0] || null;


  expansionFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.expansionSelector)]
      .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`))[0] || '';


  conditionFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.priceSelector)]
      .map(node => {
        const condition = this.conditionToDisplayFromPriceText(node.innerHTML);
        return condition ? ' - ' + condition.replace(regex.whiteSpaceStripper, `$2`) : ''
      })[0] || '';


  isFoilFromTitle = (title) => title.toLowerCase().includes('foil');
  isFoilFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.isFoilSelector)]
      .map(node => node.innerHTML)
      .map(text => this.isFoilFromTitle(text.toLowerCase()))[0] || false;


  stripWord = (word) => word.split('').filter(l => /\w/.test(l)).join('').toLowerCase();
  strongMatch = (title, searchTerm) => this.stripWord(removeDiacritics(title)).includes(this.stripWord(searchTerm));
  excludeArtCard = (title) => {
    const strippedTitle = this.stripWord(title);
    return !(strippedTitle.includes('artcard') || strippedTitle.includes('artseries') || title.includes('(Art)'));
  }


}

export default AbstractDataProcessor;
