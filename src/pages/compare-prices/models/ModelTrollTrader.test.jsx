import axios from 'axios';
import ModelTrollTrader from './ModelTrollTrader';
import { trollTraderResponseTarmogoyf, trollTraderExpectedResultsTarmogoyf } from './test-resources/model-troll-trader-response-tarmogoyf';

jest.mock('axios');


describe('ModelTrollTrader', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: trollTraderResponseTarmogoyf });

    const model = new ModelTrollTrader();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Troll Trader');
    expect(results.length).toBe(15);
    expect(results).toStrictEqual(trollTraderExpectedResultsTarmogoyf);
  });

});
