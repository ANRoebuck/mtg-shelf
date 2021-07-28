export const cors = 'https://mtg-shelf.herokuapp.com/';

export const regex = {
    whiteSpaceStripper: /([\s]*)(\S[\s\S]*\S)([\s]*)/,
    colonSplitter: /^([\s\S]*):\s([\s\S]*)$/, // returns the groups separated by ": "
    firstMajusculeString: /^[^A-Z]*([A-Z'\s]*)\s[^A-Z]?/,
}

export const identityFunction = (x) => x;
export const nullifyingFunction = (x) => null;
