import ModelAxion from './ModelAxion';
import ModelBigOrbitCards from './ModelBigOrbitCards';
import ModelMagicCardTrader from './ModelMagicCardTrader';
import ModelMagicMadhouse from './ModelMagicMadhouse';
import ModelManaLeak from './ModelManaLeak';
import ModelMountBatten from './ModelMountBatten';
import ModelPatriotGamesLeeds from './ModelPatriotGamesLeeds';
import ModelTrollTrader from './ModelTrollTrader';

export const configureModels = () => [
  // new ModelAxion(),
  new ModelBigOrbitCards(),
  // new ModelMagicCardTrader(),
  // new ModelMagicMadhouse(),
  // new ModelManaLeak(),
  // // new ModelMountBatten(),
  // new ModelPatriotGamesLeeds(),
  // new ModelTrollTrader(),
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
