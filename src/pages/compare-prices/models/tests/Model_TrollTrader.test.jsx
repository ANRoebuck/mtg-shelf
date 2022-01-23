import axios from 'axios';
import Model_TrollTrader from '../Model_TrollTrader';
import { response_trollTrader_Tarmogoyf, expectedResults_trollTrader_Tarmogoyf } from './test-resources/model-troll-trader-response-tarmogoyf';

jest.mock('axios');


describe('Model_TrollTrader', () => {

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: response_trollTrader_Tarmogoyf });

    const model = new Model_TrollTrader();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Troll Trader');
    expect(results.length).toBe(15);
    expect(results).toStrictEqual(expectedResults_trollTrader_Tarmogoyf);
  });

});
