import ModelAxion from "./model-axion";
import ModelChaosCards from "./model-chaos-cards";
import ModelMadHouse from "./model-madhouse";
import ModelPatriotGamesLeeds from "./model-patriot-games-leeds";
import ModelTrollTrader from "./model-trolltrader";

export const configureModels = () => [
  new ModelAxion(),
  new ModelChaosCards(),
  new ModelMadHouse(),
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