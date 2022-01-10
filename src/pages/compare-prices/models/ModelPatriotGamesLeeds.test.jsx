import axios from 'axios';
import ModelPatriotGamesLeeds from './ModelPatriotGamesLeeds';
import {
  patriotLeedsDesktopResponseTarmogoyf, patriotLeedsDesktopExpectedResultsTarmogoyf,
  patriotLeedsMobileResponseTarmogoyf, patriotLeedsMobileExpectedResultsTarmogoyf
} from './test-resources/model-patriot-games-leeds-response-tarmogoyf';

jest.mock('axios');

describe('ModelPatriotGamesLeeds', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ModelPatriotGamesLeedsDesktop', () => {

    it('gets results for Tarmogoyf', async () => {
      axios.get.mockResolvedValue({ data: patriotLeedsDesktopResponseTarmogoyf });

      const model = new ModelPatriotGamesLeeds();
      const results = await model.search('Tarmogoyf');

      expect(model.name).toBe('Patriot Games Leeds');
      expect(results.length).toBe(12);
      expect(results).toStrictEqual(patriotLeedsDesktopExpectedResultsTarmogoyf);
    });

  });

  describe('ModelPatriotGamesLeedsMobile', () => {

    it('gets results for Tarmogoyf', async () => {
      axios.get.mockResolvedValue({ data: patriotLeedsMobileResponseTarmogoyf });

      const model = new ModelPatriotGamesLeeds();
      const results = await model.search('Tarmogoyf');

      expect(model.name).toBe('Patriot Games Leeds');
      expect(results.length).toBe(12);
      expect(results).toStrictEqual(patriotLeedsMobileExpectedResultsTarmogoyf);
    });

  });

});



