import { face } from "./enums";
import { incrementObjectOfNumbers, pushToObjectOfArrays, validateObjectProperties } from "../../common/utils";

export const cardsByName = (cards) => cards.reduce((groups, card) =>
  pushToObjectOfArrays(groups, card.name, card), {});

export const cardsByCMC = (cards) => cards.reduce((cmcs, card) =>
  incrementObjectOfNumbers(cmcs, card.cmc), {});

export const cardsByColour = (cards) => cards.reduce((colours, card) =>
  incrementObjectOfNumbers(colours, coloursToColour(parseColours(card))), {});

export const cardsByType = (cards) => cards.reduce((types, card) =>
  incrementObjectOfNumbers(types, typeLinetoType(card.type_line)), {});

export const nonLands = (cards) => cards.filter(({type_line}) => !type_line.includes('Land'));

export const legalityByFormat = (cards) => cards.reduce((legalities, card) => {
  Object.entries(card.legalities).forEach(([format, legality]) => {
    validateObjectProperties(legalities, format, legality === 'legal')
  });
  return legalities;
}, {});

export const financeDeck = (cards) => cards.reduce((finance, card) => {
  Object.entries(card.prices).forEach(([currency, amount]) => {
    if (amount) {
      incrementObjectOfNumbers(finance, currency, parseFloat(amount));
    }
  });
  return finance;
}, {});


export const parseColours = (card) =>
  isTransformCard(card) ? card.card_faces[face.FRONT].colors : card.colors;

export const parseImgSource = (card, showFace = face.FRONT) =>
  isTransformCard(card) ? card.card_faces[showFace].image_uris.small : card.image_uris.small;

export const parseTypeLine = (card) =>
  isTransformCard(card) ? card.card_faces[face.FRONT].type_line : card.type_line;

export const parseOracleText = (card) =>
  isTransformCard(card) ? card.card_faces[face.FRONT].oracle_text : card.oracle_text;

export const isTransformCard = (card) => card.layout === 'transform';


const coloursArray = ['W', 'U', 'B', 'R', 'G', 'M', 'C'];

const coloursToColour = (colours: []) => colourIndexToColour(coloursToColourIndex(colours));

const colourIndexToColour = (cI: number) => coloursArray[cI];

const colourIndexToColourName = (cI: number) => colourToColourName(colourIndexToColour(cI));

export const coloursByColourIndex = (cA, cB) => coloursToColourIndex([cA]) - coloursToColourIndex([cB]);

export const coloursToColourIndex = (colours: []) => {
  let colour;
  if (colours.length > 1) colour = 'M';
  else if (colours.length === 0) colour = 'C';
  else [colour] = colours;
  return coloursArray.indexOf(colour);
};

export const colourToColourName = (c: string) => {
  const indexToName = {
    'W': 'white',
    'U': 'blue',
    'B': 'black',
    'R': 'red',
    'G': 'green',
    'M': 'yellow',
    'C': 'grey'
  }
  return indexToName[c];
}


// const masterSuperTypesArray = ['Legendary', 'Snow', 'Basic'];
const masterTypesArray = ['Land', 'Creature', 'Planeswalker', 'Instant', 'Sorcery', 'Artifact', 'Enchantment'];

const typeLinetoType = (typeLine: string) => typeIndexToType(typeLineToTypeIndex(typeLine));

const typeIndexToType = (tI: number) => masterTypesArray[tI];

const typeToTypeIndex = (type: string) => masterTypesArray.indexOf(type);

export const typesByTypeIndex = (tA, tB) => typeToTypeIndex(tA) - typeToTypeIndex(tB);

export const typeLineToTypeIndex = (typeLine: string) => {
  const thisTypesAndSubtypes = typeLine.split('—');
  const thisTypes = thisTypesAndSubtypes[0].split(' ');
  let typeIndex = 10;
  masterTypesArray.forEach((masterType, i) =>
    thisTypes.forEach(thisType => {
      if (thisType === masterType) typeIndex = i;
    })
  );
  return typeIndex;
};


export const landToManaTypesIndex = (card) => {
  const manaTypes = ['W', 'WU', 'U', 'UB', 'B', 'BR', 'R', 'RG', 'G', 'GW', 'WB', 'UR', 'BG', 'RW', 'UG', 'WUBRG', '<>'];
  const landTypes = {W: 'Plains', U: 'Island', B: 'Swamp', R: 'Mountain', G: 'Forest'};
  const manaSymbols = {W: '{W}', U: '{U}', B: '{B}', R: '{R}', G: '{G}'};

  const type_line = parseTypeLine(card);
  const oracle_text = parseOracleText(card);
  const thisTypes = [];

  // assume "any colour" indicates rainbow land
  const rainbow = /[\s\S]*any color[\s\S]*/i;
  if (rainbow.test(oracle_text)) return manaTypes.indexOf('WUBRG');

  // collect types based on type line and oracle text
  Object.entries(landTypes).forEach(([type, representation]) => {
    if (type_line.includes(representation) && !thisTypes.includes(type)) thisTypes.push(type);
    // if (oracle_text.includes(representation) && !thisTypes.includes(type)) thisTypes.push(type);
  });
  Object.entries(manaSymbols).forEach(([type, representation]) => {
    if (oracle_text.includes(representation) && !thisTypes.includes(type)) thisTypes.push(type);
  });

  // treat >2 colours as rainbow
  if (thisTypes.length > 2) return manaTypes.indexOf('WUBRG');

  // treat 0 colorus as glass
  if (thisTypes.length === 0) return manaTypes.indexOf('<>');

  // mono colour
  if (thisTypes.length === 1) return manaTypes.indexOf(thisTypes[0]);

  // two colour
  const guild = thisTypes.join('');
  return manaTypes.indexOf(guild);
};
