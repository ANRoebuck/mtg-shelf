import axios from 'axios';
import Model_TrollTrader from '../Model_TrollTrader';
import { trollTraderResponseTarmogoyf, trollTraderExpectedResultsTarmogoyf } from './test-resources/model-troll-trader-response-tarmogoyf';

jest.mock('axios');


describe('ModelTrollTrader', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: trollTraderResponseTarmogoyf });

    const model = new Model_TrollTrader();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Troll Trader');
    expect(results.length).toBe(15);
    expect(results).toStrictEqual(trollTraderExpectedResultsTarmogoyf);
  });

});
