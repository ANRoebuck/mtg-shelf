import axios from 'axios';
import Model_StarCityGames from '../Model_StarCityGames';
import {
  response_starCityGames_Tarmogoyf,
  expectedResults_starCityGames_Tarmogoyf, foo
} from "./test-resources/model-star-city-games-response-tarmogoyf";
import {
  expectedResults_starCityGames_RavenFamiliar,
  response_starCityGames_RavenFamiliar
} from './test-resources/model-star-city-games-response-raven-familiar';

jest.mock('axios');


describe('Model_StarCityGames', () => {

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: response_starCityGames_Tarmogoyf });

    const model = new Model_StarCityGames();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Star City Games');
    // expect(results.length).toBe(21);
    // expect(results).toStrictEqual(expectedResults_starCityGames_Tarmogoyf);
  });

  it('gets results for Raven Familiar', async () => {
    axios.get.mockResolvedValueOnce({ data: response_starCityGames_RavenFamiliar });

    const model = new Model_StarCityGames();
    const results = await model.search('Raven Familiar');

    expect(model.name).toBe('Star City Games');
    // expect(results.length).toBe(3);
    // expect(results).toStrictEqual(expectedResults_starCityGames_RavenFamiliar);
  });

});
