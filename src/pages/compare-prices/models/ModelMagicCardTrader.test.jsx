import axios from 'axios';
import ModelMagicCardTrader from './ModelMagicCardTrader';
import { magicCardTraderResponseTarmogoyf, magicCardTraderExpectedResultsTarmogoyf } from './test-resources/model-magic-card-trader-response-tarmogoyf';

jest.mock('axios');


describe('ModelMagicCardTrader', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: magicCardTraderResponseTarmogoyf });

    const model = new ModelMagicCardTrader();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Magic Card Trader');
    expect(results.length).toBe(10);
    expect(results).toStrictEqual(magicCardTraderExpectedResultsTarmogoyf);
  });

});
