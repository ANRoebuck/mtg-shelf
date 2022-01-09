import ModelAxion from './ModelAxion';
import ModelBigOrbitCards from './ModelBigOrbitCards';
import ModelChaosCards_3 from './ModelChaosCards_3';
import ModelHareruya from './ModelHareruya';
import ModelHarlequins from './ModelHarlequins';
import ModelMagicCardTrader from './ModelMagicCardTrader';
import ModelMagicMadhouse from './ModelMagicMadhouse';
import ModelManaLeak from './ModelManaLeak';
import ModelMountBatten from './ModelMountBatten';
import ModelNerdShak from './ModelNerdShak';
import aPatriotGamesLeedsModel from './ModelPatriotGamesLeeds';
import ModelStarCityGames from './ModelStarCityGames';
import ModelTrollTrader from './ModelTrollTrader';


// For use during development
// If this array is empty, all models will be used.
// Otherwise, only the models in this array will be used.
const modelSubset = [
  // new ModelNerdShak(),
];

const allModels = [
  new ModelAxion(),
  new ModelBigOrbitCards(),
  new ModelMagicCardTrader(),
  new ModelHarlequins(),
  new ModelMagicMadhouse(),
  new ModelManaLeak(),
  new ModelMountBatten(),
  new ModelNerdShak(),
  aPatriotGamesLeedsModel(),
  new ModelTrollTrader(),

  // non-UK
  new ModelStarCityGames(),
  new ModelHareruya(),
];

const getModels = () => modelSubset.length > 0 ? modelSubset : allModels;

export const configureModels = () => getModels().map(model => {
    return {
      name: model.name,
      logo: model.logo,
      enabled: true,
      loading: false,
      results: '',
      inStock: '',
      favourite: false,
      model
    }
  });
