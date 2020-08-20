import { splitColumnByCreatures } from "../utils/utils";
import { splitBy } from "../utils/enums";


class ColumnSplitter {

  splitColumnsBy = (column, split) => {
    switch (split) {
      case splitBy.none:
        return [column, []];
      case splitBy.spells:
        return splitColumnByCreatures(column);
      default:
        return null;
    }
  }

}

export default ColumnSplitter;
