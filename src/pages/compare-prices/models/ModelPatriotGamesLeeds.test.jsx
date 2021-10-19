import axios from 'axios';
import ModelPatriotGamesLeeds from './ModelPatriotGamesLeeds';
import { patriotLeedsResponseTarmogoyf, patriotLeedsExpectedResultsTarmogoyf } from './test-resources/model-patriot-games-leeds-response-tarmogoyf';

jest.mock('axios');


describe('ModelAxion', () => {

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: patriotLeedsResponseTarmogoyf });

    const model = new ModelPatriotGamesLeeds();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Patriot Games Leeds');
    expect(results.length).toBe(12);
    expect(results).toStrictEqual(patriotLeedsExpectedResultsTarmogoyf);
  });

});
