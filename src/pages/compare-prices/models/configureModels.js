import Model_Axion from './Model_Axion';
import Model_BigOrbitCards from './Model_BigOrbitCards';
import Model_Harlequins from './Model_Harlequins';
import Model_LazyDragonGaming from './Model_LazyDragonGaming';
import Model_LondonMagicTraders from './Model_LondonMagicTraders';
import Model_LvlUp from './Model_LvlUp';
import Model_MagicCardTrader from './Model_MagicCardTrader';
import Model_MagicMadhouse from './Model_MagicMadhouse';
import Model_ManaLeak from './Model_ManaLeak';
import Model_MountbattenCollectables from './Model_MountbattenCollectables';
import Model_NerdShak from './Model_NerdShak';
import Model_PatriotGamesLeeds from './Model_PatriotGamesLeeds';
import Model_TrollTrader from './Model_TrollTrader';

// non-UK
import Model_MKM from './Model_MKM';
import Model_StarCityGames from './Model_StarCityGames';
import Model_Hareruya from './Model_Hareruya';


// For use during development
// If this array is empty, all models will be used.
// Otherwise, only the models in this array will be used.
const modelSubset = [
  // new Model_Axion(),
];

const allModels = [
  new Model_Axion(),
  new Model_BigOrbitCards(),
  new Model_MagicCardTrader(),
  new Model_Harlequins(),
  new Model_LazyDragonGaming(),
  new Model_LondonMagicTraders(),
  new Model_LvlUp(),
  new Model_MagicMadhouse(),
  new Model_ManaLeak(),
  new Model_MountbattenCollectables(),
  // Nerd Shack have been removed following repeated complaints from customers regarding poor service
  // new Model_NerdShak(),
  new Model_PatriotGamesLeeds(),
  new Model_TrollTrader(),

  // non-UK
  new Model_StarCityGames(),
  new Model_Hareruya(),
];

const getModels = () => modelSubset.length > 0 ? modelSubset : allModels;

export const configureModels = () => getModels().map(configureModel);

export const configureModel = (model) => {
  return {
    name: model.name,
    logo: model.logo,
    enabled: true,
    loading: false,
    results: '',
    inStock: '',
    favourite: false,
    model,
  };
}
