import ModelAxion from "./model-axion";
import ModelChaosCards from "./model-chaos-cards";
import ModelMagicMadHouse from "./model-magic-mad-house";
import ModelPatriotGamesLeeds from "./model-patriot-games-leeds";
import ModelTrollTrader from "./model-trolltrader";
import ModelMagicCardTrader from "./model-magic-card-trader";
import ModelBigOrbitCards from "./model-big-orbit-cards";

export const configureModels = () => [
  new ModelAxion(),
  // new ModelChaosCards(),
  new ModelBigOrbitCards(),
  new ModelMagicCardTrader(),
  new ModelMagicMadHouse(),
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
