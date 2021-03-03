import { assignLandPositionBy, rowsBy } from "../utils/enums";
import { parseTypeLine } from "../utils/utils";

class RowSorter {

  sortRowsBy = (cards, sortBy) => {
    switch (sortBy) {
      case rowsBy.none:
        return { all: cards };
      case rowsBy.creatures:
        return groupRowsByCreatures(cards);
      default:
        return null;
    }
  }

  landPositionBy = (cards, positionBy) => {
    switch (positionBy) {
      case assignLandPositionBy.default:
        return cards;
      case assignLandPositionBy.bottom:
        return groupRowsByLands(cards);
      default:
        return null;
    }
  }

}

const groupRowsByCreatures = (cards) => {
  const regex = /[\s\S]*creature[\s\S]*/i;
  const creatures = cards.filter(({type_line}) => regex.test(type_line));
  const nonCreatures = cards.filter(({type_line}) => !regex.test(type_line));
  return { creatures, nonCreatures };
}

const groupRowsByLands = (cards) => {
  const regex = /[\s\S]*land[\s\S]*/i;
  const lands = [];
  const reducedObject = Object.entries(cards).reduce((acc, [key, cards]) => {
    cards
      .filter((card) => regex.test(parseTypeLine(card)))
      .forEach(card => lands.push(card));
    return {
      ...acc,
      [key]: cards.filter((card) => !regex.test(parseTypeLine(card))),
    }
  }, {});
  return { ...reducedObject, lands };
}

export default RowSorter;
