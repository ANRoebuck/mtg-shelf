import {
  coloursToColourIndex, landToManaTypesIndex, parseColours, typeLineToTypeIndex
} from "../utils/utils";
import { pushToObjectOfArrays } from "../../common/utils";
import { columnsBy } from "../utils/enums";

class ColumnSorter {

  assignColumns = (cards, sort) => {
    switch (sort) {
      case columnsBy.cmc:
        return assignColumnsByCMC(cards);
      case columnsBy.colour:
        return assignColumnsByColour(cards);
      case columnsBy.type:
        return assignColumnsByType(cards);
      case 'lands':
        return assignColumnsForLands(cards);
      default:
        return null;
    }
  }

}

const assignColumnsByCMC = (cards) => cards.reduce((columns, card) =>
  pushToObjectOfArrays(columns, card.cmc, card), {});

const assignColumnsByColour = (cards) => cards.reduce((columns, card) =>
  pushToObjectOfArrays(columns, coloursToColourIndex(parseColours(card)), card), {});

const assignColumnsByType = (cards) => cards.reduce((columns, card) =>
  pushToObjectOfArrays(columns, typeLineToTypeIndex(card.type_line), card), {});

const assignColumnsForLands = (cards) => cards.reduce((columns, card) =>
  pushToObjectOfArrays(columns, landToManaTypesIndex(card), card), {});

export default ColumnSorter;
