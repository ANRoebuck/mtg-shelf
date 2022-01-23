import axios from 'axios';
import Model_PatriotGamesLeeds from '../Model_PatriotGamesLeeds';
import {
  response_patriotGamesLeeds_desktop_Tarmogoyf, expectedResults_patriotGamesLeeds_desktop_Tarmogoyf,
  response_patriotGamesLeeds_mobile_Tarmogoyf, expectedResults_patriotGamesLeeds_mobile_Tarmogoyf
} from './test-resources/model-patriot-games-leeds-response-tarmogoyf';

jest.mock('axios');

describe('Model_PatriotGamesLeeds', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Model_PatriotGamesLeeds_Desktop', () => {

    it('gets results for Tarmogoyf', async () => {
      axios.get.mockResolvedValue({ data: response_patriotGamesLeeds_desktop_Tarmogoyf });

      const model = new Model_PatriotGamesLeeds();
      const results = await model.search('Tarmogoyf');

      expect(model.name).toBe('Patriot Games Leeds');
      expect(results.length).toBe(12);
      expect(results).toStrictEqual(expectedResults_patriotGamesLeeds_desktop_Tarmogoyf);
    });

  });

  describe('Model_PatriotGamesLeeds_Mobile', () => {

    it('gets results for Tarmogoyf', async () => {
      axios.get.mockResolvedValue({ data: response_patriotGamesLeeds_mobile_Tarmogoyf });

      const model = new Model_PatriotGamesLeeds();
      const results = await model.search('Tarmogoyf');

      expect(model.name).toBe('Patriot Games Leeds');
      expect(results.length).toBe(12);
      expect(results).toStrictEqual(expectedResults_patriotGamesLeeds_mobile_Tarmogoyf);
    });

  });

});



