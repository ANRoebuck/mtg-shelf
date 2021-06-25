import ModelAxion from './ModelAxion';
import ModelBigOrbitCards from './ModelBigOrbitCards';
import ModelChaosCards from './ModelChaosCards';
import ModelChaosCards_LazyLoading from './ModelChaosCards_LazyLoading';
import ModelMagicCardTrader from './ModelMagicCardTrader';
import ModelMagicMadhouse from './ModelMagicMadhouse';
import ModelManaLeak from './ModelManaLeak';
import ModelPatriotGamesLeeds from './ModelPatriotGamesLeeds';
import ModelTrollTrader from './ModelTrollTrader';

export const configureModels = () => [
  new ModelAxion(),
  new ModelBigOrbitCards(),
  // new ModelChaosCards(),
  // new ModelChaosCards_LazyLoading(),
  new ModelMagicCardTrader(),
  new ModelMagicMadhouse(),
  new ModelManaLeak(),
  new ModelPatriotGamesLeeds(),
  new ModelTrollTrader(),
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
