

class AbstractProcessorSelector {

  constructor({ dataProcessor }) {
    this.parser = new DOMParser();
    this.dataProcessor = dataProcessor;
  }

  getProcessor = (rawData) => this.dataProcessor;

}

export default AbstractProcessorSelector;
