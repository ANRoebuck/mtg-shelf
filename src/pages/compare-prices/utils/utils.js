export const cors = 'https://mtg-shelf.herokuapp.com/';

export const regex = {
    whiteSpaceStripper: /([\s]*)(\S[\s\S]*\S)([\s]*)/,
    colonSplitter: /^([\s\S]*):\s([\s\S]*)$/, // returns the groups separated by ": "
    firstMajusculeString: /^[^A-Z]*([A-Z'\s]*)\s[^A-Z]?/,
}

export const identityFunction = (x) => x;
export const nullifyingFunction = () => null;

export const textToDigits = (text) => text ? parseInt(text.replace(/[£$.,]/g, ``)) : 9999;

// export const removeDiacritics = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
export const removeDiacritics = (str) => str.normalize("NFD").replace(/\p{Diacritic}/gu, '');
