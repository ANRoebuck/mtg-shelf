import { face } from "./enums";

export const assignColumnsByCMC = (deckList) =>
  deckList.reduce((columns, card) => pushToObjectOfArrays(columns, card.cmc, card), {});

export const assignColumnsByColour = (decklist) => {
  return decklist.reduce((columns, card) => {
    const colours = parseColours(card);
    const colourIndex = coloursToColourIndex(colours);
    return pushToObjectOfArrays(columns, colourIndex, card);
  }, {});
};

export const assignColumnsByType = (decklist) => {
  return decklist.reduce((columns, card) => {
    const { type_line } = card;
    const typeIndex = typeLineToTypeIndex(type_line);
    return pushToObjectOfArrays(columns, typeIndex, card);
  }, {});
};

export const splitColumnByCreatures = (column) => {
  const regex = /[\s\S]*creature[\s\S]*/i;
  const top = column.filter(({type_line}) => regex.test(type_line));
  const bottom = column.filter(({type_line}) => !regex.test(type_line));
  return [top, bottom];
}

export const groupCardsByName = (cards) => cards.reduce((groups, card) => pushToObjectOfArrays(groups, card.name, card), {});

const coloursToColourIndex = (colours: []) => {
  let colour;
  if (colours.length > 1) colour = 'M';
  else if (colours.length === 0) colour = 'C';
  else [colour] = colours;
  const coloursArray = ['W', 'U', 'B', 'R', 'G', 'M', 'C'];
  return coloursArray.indexOf(colour);
};

const typeLineToTypeIndex = (typeLine) => {
  const typesAndSubtypes = typeLine.split('—');
  const types = typesAndSubtypes[0].split(' ');
  const typesArray = ['Land', 'Artifact', 'Creature', 'Planeswalker', 'Enchantment', 'Instant', 'Sorcery'];
  let typeIndex = typesArray.length;
  // const superTypesArray = ['Legendary', 'Snow', 'Basic'];
  typesArray.forEach((type, i) => {
    if(types[0] === type) typeIndex = i;
  });
  return typeIndex;
}

const pushToObjectOfArrays = (object, key, value) => {
  if (!object[key]) object[key] = [value];
  else object[key].push(value);
  return object;
}

const incrementObjectOfNumbers = (object, key) => {
  if (!object[key]) object[key] = 1;
  else object[key] += 1;
  return object;
}

const validateObjectProperties = (object, key, isValid) => {
  if (!object[key]) object[key] = isValid;
  if (object[key] && !isValid) object[key] = isValid;
  return object;
}

export const nextInArray = (array: [], current: any) => {
  const i = array.indexOf(current);
  if (i === -1) return null;
  if (i === array.length - 1) return array[0];
  return array[i + 1];
};

export const isTransformCard = (card) => card.layout === 'transform';

const parseColours = (card) => {
  if (isTransformCard(card)) {
    return card.card_faces[face.FRONT].colors;
  }
  return card.colors;
}

export const parseImgSource = (card, showFace = face.FRONT) => {
  if (isTransformCard(card)) {
    return card.card_faces[showFace].image_uris.small;
  }
  return card.image_uris.small;
}

export const financeDeck = (cards) => cards.reduce((finance, card) => {
  Object.entries(card.prices).forEach(([currency, amount]) => {
    if (amount) {
      incrementObjectOfNumbers(finance, currency, parseFloat(amount));
    }
  });
  return finance;
}, {});

export const cardsByCMC = (cards) => cards.reduce((cmcs, card) =>
  incrementObjectOfNumbers(cmcs, card.cmc), {});

export const cardsByColour = (cards) => cards.reduce((colours, card) =>
  incrementObjectOfNumbers(colours, parseColours(card)), {});

export const legalityByFormat = (cards) => cards.reduce((legalities, card) => {
  Object.entries(card.legalities).forEach(([format, legality]) => {
    validateObjectProperties(legalities, format, legality === 'legal')
  });
  return legalities;
}, {});
