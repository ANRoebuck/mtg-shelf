import axionLogo from '../resources/axionLogo.png';
import bigOrbitLogo from '../resources/bigOrbitCardsLogo.png';
import chaosLogo from '../resources/chaosCardsLogo.png';
import magicCardTraderLogo from '../resources/magicCardTraderLogo.png';
import magicMadhouseLogo from '../resources/magicMadhouseLogo.png';
import pgLeedsLogo from '../resources/patriotGamesLeedsLogo.png';
import trollLogo from '../resources/trollTraderLogo.png';

export const cors = 'https://mtg-shelf.herokuapp.com/';

export const seller = {
  axion: {
    name: 'Axion Now',
    logo: axionLogo,
  },
  bigOrbit: {
    name: 'Big Orbit Cards',
    logo: bigOrbitLogo,
  },
  chaos: {
    name: 'Chaos Cards',
    logo: chaosLogo,
  },
  magicCardTrader: {
    name: 'Magic Card Trader',
    logo: magicCardTraderLogo,
  },
  magicMadhouse: {
    name: 'Magic Madhouse',
    logo: magicMadhouseLogo,
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
  bigOrbit: bigOrbitLogo,
  chaos: chaosLogo,
  magicCardTrader: magicCardTraderLogo,
  magicMadhouse: magicMadhouseLogo,
  pgLeeds: pgLeedsLogo,
  trollTrader: trollLogo,
}

export const regex = {
  whiteSpaceStripper: /([\s]*)(\S[\s\S]*\S)([\s]*)/
}
