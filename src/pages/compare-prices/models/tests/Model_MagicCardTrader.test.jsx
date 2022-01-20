import axios from 'axios';
import Model_MagicCardTrader from '../Model_MagicCardTrader';
import { response_magicCardTrader_Tarmogoyf, expectedResults_magicCardTrader_Tarmogoyf } from './test-resources/model-magic-card-trader-response-tarmogoyf';

jest.mock('axios');


describe('ModelMagicCardTrader', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: response_magicCardTrader_Tarmogoyf });

    const model = new Model_MagicCardTrader();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Magic Card Trader');
    expect(results.length).toBe(10);
    expect(results).toStrictEqual(expectedResults_magicCardTrader_Tarmogoyf);
  });

});
