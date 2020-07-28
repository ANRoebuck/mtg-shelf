import axionLogo from '../resources/axionLogo.png';
import chaosLogo from '../resources/chaosCardsLogo.png';
import madhouseLogo from '../resources/madhouseLogo.png';
import pgLeedsLogo from '../resources/patriotGamesLeedsLogo.png';
import trollLogo from '../resources/trollTraderLogo.png';

export const cors = 'https://cors-anywhere.herokuapp.com/';

export const seller = {
  axion: {
    name: 'Axion Now',
    logo: axionLogo,
  },
  chaos: {
    name: 'Chaos Cards',
    logo: chaosLogo,
  },
  madhouse: {
    name: 'Magic Madhouse',
    logo: madhouseLogo,
  },
  pgLeeds: {
    name: 'Patriot Games - Leeds',
    logo: pgLeedsLogo,
  },
  trollTrader: {
    name: 'Troll Trader',
    logo: trollLogo,
  },
};

export const logo = {
  axion: axionLogo,
  chaos: chaosLogo,
  madhouse: madhouseLogo,
  pgLeeds: pgLeedsLogo,
  trollTrader: trollLogo,
}

export const regex = {
  whiteSpaceStripper: /([\s]*)(\S[\s\S]*\S)([\s]*)/
}
