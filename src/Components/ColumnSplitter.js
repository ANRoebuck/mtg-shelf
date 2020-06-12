import { splitColumnByCreatures } from "./utils";

export const splitBy = {
  noSplit: 'noSplit',
  spells: 'spells',
}

class ColumnSplitter {

  constructor() {
  }

  splitColumnsBy = (column, split) => {
    switch (split) {
      case splitBy.noSplit:
        return [column, []];
      case splitBy.spells:
        return splitColumnByCreatures(column);
      default:
        return null;
    }
  }

}

export default ColumnSplitter;
