import ModelAxion from "./ModelAxion";
import ModelMagicMadhouse from "./ModelMagicMadhouse";
import ModelPatriotGamesLeeds from "./ModelPatriotGamesLeeds";
import ModelTrollTrader from "./ModelTrollTrader";
import ModelMagicCardTrader from "./ModelMagicCardTrader";
import ModelBigOrbitCards from "./ModelBigOrbitCards";

export const configureModels = () => [
  new ModelAxion(),
  new ModelBigOrbitCards(),
  new ModelMagicCardTrader(),
  new ModelMagicMadhouse(),
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
