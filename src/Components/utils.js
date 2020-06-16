import { face } from "./enums";

export const assignColumnsByCMC = (deckList) => {
  return deckList.reduce((columns, card) => {
    const { cmc } = card;
    return addToObject(columns, cmc, card);
  }, {});
};

export const assignColumnsByColour = (decklist) => {
  return decklist.reduce((columns, card) => {
    const colours = parseColours(card);
    const colourIndex = coloursToColourIndex(colours);
    return addToObject(columns, colourIndex, card);
  }, {});
};

export const assignColumnsByType = (decklist) => {
  return decklist.reduce((columns, card) => {
    const { type_line } = card;
    const typeIndex = typeLineToTypeIndex(type_line);
    return addToObject(columns, typeIndex, card);
  }, {});
};

export const splitColumnByCreatures = (column) => {
  const regex = /[\s\S]*creature[\s\S]*/i;
  const top = column.filter(({ type_line })=> regex.test(type_line));
  const bottom = column.filter(({ type_line }) => !regex.test(type_line));
  return [top, bottom];
}

export const groupCardsByName = (cards) => cards.reduce((groups, card) => addToObject(groups, card.name, card), {});

const coloursToColourIndex = (colours: []) => {
  let colour;
  if(colours.length > 1) colour = 'M';
  else if(colours.length ===0) colour = 'C';
  else [colour] = colours;
  const coloursArray = ['W', 'U', 'B', 'R', 'G', 'M', 'C'];
  return coloursArray.indexOf(colour);
};

const typeLineToTypeIndex = (typeLine) => {
  // const typesAndSubtypes = typeLine.split('—');
  // const types = typesAndSubtypes[0].split[' '];
  console.log(typeLine);
  return 0;
}

const addToObject = (object, key, value) => {
  if(!object[key]) object[key] = [value];
  else object[key].push(value);
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
  if(isTransformCard(card)) {
    return card.card_faces[face.FRONT].colors;
  }
  return card.colors;
}

export const parseImgSource = (card, showFace = face.FRONT) => {
  if(isTransformCard(card)) {
    return card.card_faces[showFace].image_uris.small;
  }
  return card.image_uris.small;
}
