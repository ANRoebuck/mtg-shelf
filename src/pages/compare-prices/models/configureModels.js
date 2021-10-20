import ModelAxion from './ModelAxion';
import ModelBigOrbitCards from './ModelBigOrbitCards';
import ModelMagicCardTrader from './ModelMagicCardTrader';
import ModelMagicMadhouse from './ModelMagicMadhouse';
import ModelManaLeak from './ModelManaLeak';
import ModelMountBatten from './ModelMountBatten';
import ModelPatriotGamesLeeds from './ModelPatriotGamesLeeds';
import ModelStarCityGames from './ModelStarCityGames';
import ModelTrollTrader from './ModelTrollTrader';
import ModelHareruya from './ModelHareruya';

export const configureModels = () => [
  new ModelAxion(),
  new ModelBigOrbitCards(),
  new ModelMagicCardTrader(),
  new ModelMagicMadhouse(),
  new ModelManaLeak(),
  new ModelMountBatten(),
  new ModelPatriotGamesLeeds(),
  new ModelTrollTrader(),
  new ModelStarCityGames(),
  new ModelHareruya(),
].map(model => {
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
