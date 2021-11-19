import axios from 'axios';
import aPatriotGamesLeedsModel from './ModelPatriotGamesLeeds';
import { patriotLeedsDesktopResponseTarmogoyf, patriotLeedsDesktopExpectedResultsTarmogoyf } from './test-resources/model-patriot-games-leeds-response-tarmogoyf';

jest.mock('axios');


describe('ModelPatriotGamesLeedsDesktop', () => {

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: patriotLeedsDesktopResponseTarmogoyf });

    const model = aPatriotGamesLeedsModel('desktop');
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Patriot Games Leeds');
    expect(results.length).toBe(12);
    expect(results).toStrictEqual(patriotLeedsDesktopExpectedResultsTarmogoyf);
  });

});
