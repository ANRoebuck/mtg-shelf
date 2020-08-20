import { assignColumnsByCMC, assignColumnsByColour, assignColumnsByType } from "../utils/utils";
import { sortBy } from "../utils/enums";


class ColumnSorter {

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
