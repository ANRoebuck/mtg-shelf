import ModelAxion from './ModelAxion';
import ModelBigOrbitCards from './ModelBigOrbitCards';
import ModelChaosCards_3 from './ModelChaosCards_3';
import ModelMagicCardTrader from './ModelMagicCardTrader';
import ModelMagicMadhouse from './ModelMagicMadhouse';
import ModelManaLeak from './ModelManaLeak';
import ModelMountBatten from './ModelMountBatten';
import aPatriotGamesLeedsModel from './ModelPatriotGamesLeeds';
import ModelStarCityGames from './ModelStarCityGames';
import ModelTrollTrader from './ModelTrollTrader';
import ModelHareruya from './ModelHareruya';


// For use during development
// If this array is empty, all models will be used.
// Otherwise, only the models in this array will be used.
const modelSubset = [
  new ModelBigOrbitCards(),
];

const allModels = [
  new ModelAxion(),
  new ModelBigOrbitCards(),
  new ModelMagicCardTrader(),
  new ModelMagicMadhouse(),
  new ModelManaLeak(),
  new ModelMountBatten(),
  aPatriotGamesLeedsModel(),
  new ModelTrollTrader(),
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
