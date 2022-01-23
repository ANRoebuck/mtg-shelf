import axionLogo from '../models/resources/axion 150x60.png';
import bigOrbitLogo from '../models/resources/bigOrbitCards 150x60.png';
import chaosLogo from '../models/resources/chaosCards 150x60.png';
import harlequinsLogo from '../models/resources/harlequins 150x60.png';
import hareruyaLogo from '../models/resources/hareryua 150x60.png';
import lazyDragonLogo from '../models/resources/lazyDragonGaming-3 150x60.jpg';
import lvlUpLogo from '../models/resources/lvlUp 150x60.png';
import magicCardTraderLogo from '../models/resources/magicCardTrader-black 150x60.png';
import magicMadhouseLogo from '../models/resources/magicMadhouse 150x60.png';
import manaleakLogo from '../models/resources/manaLeak 150x60.png';
import mountBattenLogo from '../models/resources/mountBatten 150x60.png';
import nerdShakLogo from '../models/resources/nerdShak 150x60.jpg';
import pgLeedsLogo from '../models/resources/patriotGamesLeeds 150x60.png';
import starCityGamesLogo from '../models/resources/starCityGames 150x60.png';
import trollLogo from '../models/resources/trollTrader 150x60.png';

export const currency = {
  EUR: { representation: '€', decimalPlaces: 2, conversionFactor: 1, },
  GBP: { representation: '£', decimalPlaces: 2, conversionFactor: 1, },
  JPY: { representation: '¥', decimalPlaces: 0, conversionFactor: 1, },
  USD: { representation: '$', decimalPlaces: 2, conversionFactor: 1, },
}

export const seller = {
  axion: {
    name: 'Axion Now',
    logo: axionLogo,
    currency: currency.GBP,
  },
  bigOrbit: {
    name: 'Big Orbit Cards',
    logo: bigOrbitLogo,
    currency: currency.GBP,
  },
  chaos: {
    name: 'Chaos Cards',
    logo: chaosLogo,
    currency: currency.GBP,
  },
  hareruya: {
    name: 'Hareruya',
    logo: hareruyaLogo,
    currency: currency.GBP,
  },
  harlequins: {
    name: 'Harlequins',
    logo: harlequinsLogo,
    currency: currency.GBP,
  },
  lazyDragon : {
    name: 'Lazy Dragon Gaming',
    logo: lazyDragonLogo,
    currency: currency.GBP,
  },
  lvlUp: {
    name: 'Lvl Up Gaming',
    logo: lvlUpLogo,
    currency: currency.GBP,
  },
  magicCardTrader: {
    name: 'Magic Card Trader',
    logo: magicCardTraderLogo,
    currency: currency.GBP,
  },
  magicMadhouse: {
    name: 'Magic Madhouse',
    logo: magicMadhouseLogo,
    currency: currency.GBP,
  },
  manaLeak: {
    name: 'Manaleak',
    logo: manaleakLogo,
    currency: currency.GBP,
  },
  mountBatten: {
    name: 'Mountbatten Collectables',
    logo: mountBattenLogo,
    currency: currency.GBP,
  },
  nerdShak: {
    name: 'Nerd Shak',
    logo: nerdShakLogo,
    currency: currency.GBP,
  },
  pgLeeds: {
    name: 'Patriot Games Leeds',
    logo: pgLeedsLogo,
    currency: currency.GBP,
  },
  starCityGames: {
    name: 'Star City Games',
    logo: starCityGamesLogo,
    currency: currency.USD,
  },
  trollTrader: {
    name: 'Troll Trader',
    logo: trollLogo,
    currency: currency.JPY,
  },
};

export const sortOosBy = {
  last : 'Last',
  exclude : 'Exclude',
  none : 'Don\'t sort',
};

export const filterFoilsBy = {
  all: 'All',
  foil: 'Foil',
  nonFoil: 'Non-Foil',
};

export const sortPriceBy = {
  asc: 'Ascending',
  dsc: 'Descending',
};
