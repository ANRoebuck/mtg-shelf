

class AbstractProcessorSelector {

  constructor({ dataProcessor }) {
    this.parser = new DOMParser();
    this.dataProcessor = dataProcessor;
  }

  getProcessor = (rawData, searchTerm) => this.dataProcessor;

}

export default AbstractProcessorSelector;
