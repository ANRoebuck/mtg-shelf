import { emptyString, regex, removeDiacritics } from '../utils/utils';


class AbstractDataProcessor {

  constructor({
                resultSelector, titleSelector, subresultSelector, subtitleSelector, subtitleFromText,
                priceSelector, priceToDisplayFromPriceText, priceValueFromPriceText,
                stockSelector, stockValueFromStockText, expansionSelector, isFoilSelector,
                imgSelector, imgBaseUrl, imgSrcAttribute,
                productSelector, productBaseUrl, productRefAttribute,
              }) {

    this.resultSelector = resultSelector;
    this.titleSelector = titleSelector;

    this.subresultSelector = subresultSelector;
    this.subtitleSelector = subtitleSelector;
    this.subtitleFromText = subtitleFromText || emptyString;

    this.priceSelector = priceSelector;
    this.priceToDisplayFromPriceText = priceToDisplayFromPriceText;
    this.priceValueFromPriceText = priceValueFromPriceText;

    this.stockSelector = stockSelector;
    this.stockValueFromStockText = stockValueFromStockText;
    this.expansionSelector = expansionSelector;
    this.isFoilSelector = isFoilSelector;

    this.imgSelector = imgSelector;
    this.imgBaseUrl = imgBaseUrl;
    this.imgSrcAttribute = imgSrcAttribute;

    this.productSelector = productSelector;
    this.productBaseUrl = productBaseUrl;
    this.productRefAttribute = productRefAttribute;

    this.parser = new DOMParser();
  }

  processData = (data) => {

    const processedResults = [];

    const resultNodes = this.dataToResultsArray(data);

    resultNodes.forEach(resultNode => {

      let subresultNodes = this.subresultSelector ? this.subresultsFromResultNode(resultNode) : [resultNode];

      const title = this.titleFromResultNode(resultNode);
      const imgSrc = this.imgSrcFromResultNode(resultNode);
      const productRef = this.productRefFromResultNode(resultNode);
      const expansion = this.expansionFromResultNode(resultNode);

      subresultNodes.forEach(subresult => {

        const price = this.priceFromResultNode(subresult);
        const stock = this.stockFromResultNode(subresult);
        const subtitle = this.subtitleFromResultNode(subresult);
        const isFoil =
          this.isFoilFromTitle(title) || this.isFoilFromTitle(subtitle) || this.isFoilFromResultNode(resultNode);

        processedResults.push({
          title,
          imgSrc,
          productRef,
          expansion,
          price,
          stock,
          subtitle,
          isFoil,
        });

      });

    });

    return processedResults;

  }


  dataToResultsArray = (data) => {
    const document = this.parser.parseFromString(data, "text/html");
    return document.querySelectorAll(this.resultSelector);
  }


  subresultsFromResultNode = (resultNode) => [...resultNode.querySelectorAll(this.subresultSelector)];


  priceFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.priceSelector)]
      .map(node => {
        const nodeText = node.innerHTML;
        return {
          text: this.priceToDisplayFromPriceText(nodeText).replace(regex.whiteSpaceStripper, `$2`),
          value: this.priceValueFromPriceText(nodeText),
        };
      })[0] || {text: '', value: 9999};


  titleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.titleSelector)]
      .map(node => node.innerHTML.replace(regex.whiteSpaceStripper, `$2`))[0] || '';


  subtitleFromResultNode = (resultNode) =>
    [...resultNode.querySelectorAll(this.subtitleSelector)]
      .map(node => this.subtitleFromText(node.innerHTML).replace(regex.whiteSpaceStripper, `$2`))[0] || '';


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
