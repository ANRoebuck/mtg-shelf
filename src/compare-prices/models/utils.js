import axionLogo from '../resources/axionLogo 150x60.png';
import bigOrbitLogo from '../resources/bigOrbitCardsLogo 150x60.png';
import chaosLogo from '../resources/chaosCardsLogo 150x60.png';
import magicCardTraderLogo from '../resources/magicCardTraderLogo-black 150x60.png';
import magicMadhouseLogo from '../resources/magicMadhouseLogo 150x60.png';
import pgLeedsLogo from '../resources/patriotGamesLeedsLogo 150x60.png';
import trollLogo from '../resources/trollTraderLogo 150x60.png';

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
