import { assignColumnsByCMC, assignColumnsByColour, assignColumnsByType } from "./utils";

export const sortBy = {
  cmc: 'cmc',
  colour: 'colour',
  type: 'type',
}

export const splitBy = {
  spells: 'spells',
  noSplit: 'noSplit'
}

class ColumnSorter {

  constructor() {
  }

  assignColumns = (deckList, sort) => {
    switch (sort) {
      case sortBy.cmc:
        return assignColumnsByCMC(deckList);
      case sortBy.colour:
        return assignColumnsByColour(deckList);
      case sortBy.type:
        return assignColumnsByType(deckList);
      default:
        return null;
    }
  }

}

export default ColumnSorter;
