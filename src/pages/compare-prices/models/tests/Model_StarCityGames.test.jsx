import axios from 'axios';
import Model_StarCityGames from '../Model_StarCityGames';
import { starCityResponseTarmogoyf, starCityExpectedResultsTarmogoyf } from "./test-resources/model-star-city-games-response-tarmogoyf";

jest.mock('axios');


describe('ModelMagicMadhouse', () => {

  it('gets results for tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: starCityResponseTarmogoyf });

    const model = new Model_StarCityGames();
    const results = await model.search('Tarmogoyf');

    // expect(model.name).toBe('Star City Games');
    // expect(results.length).toBe(21);
    // expect(results).toStrictEqual(starCityExpectedResultsTarmogoyf);
  });

  it('gets results for raven familiar', async () => {
    axios.get.mockResolvedValueOnce({ data: starCityExpectedResultsTarmogoyf });

    const model = new Model_StarCityGames();
    const results = await model.search('Raven Familiar');

    // expect(model.name).toBe('Star City Games');
    // expect(results.length).toBe(3);
    // expect(results).toStrictEqual(starCityExpectedResultsTarmogoyf);
  });

});
