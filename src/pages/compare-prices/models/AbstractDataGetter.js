import axios from 'axios';


class AbstractDataGetter {

  constructor({ cors, baseUrl, searchPath, searchSuffix, searchJoin }) {
    this.cors = cors;
    this.baseUrl = baseUrl;
    this.searchPath = searchPath;
    this.searchSuffix = searchSuffix;
    this.searchJoin = searchJoin;
  }

  getData = (searchTerm) => axios
    .get(
       this.searchTermToUrl(searchTerm),
       {
         headers: {
           origin: https://compare-the-magic.netlify.app/
         },
       }
    )
    .then(this.extractData)
    .catch(() => '');

  searchTermToUrl = (searchTerm) => this.cors
    + this.baseUrl + this.searchPath
    + searchTerm.toLowerCase().split(' ').join(this.searchJoin)
    + this.searchSuffix;

  extractData = ({ data }) => data || '';

}

export default AbstractDataGetter;
