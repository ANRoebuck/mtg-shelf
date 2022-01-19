import axios from 'axios';
import Model_NerdShak from '../Model_NerdShak';
import {
  nerdShakExpectedResultsTarmogoyf,
  nerdShakResponseTarmogoyf
} from './test-resources/model-nerd-shak-search-response-tarmogoyf';

jest.mock('axios');


describe('ModelNerdShak', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: nerdShakResponseTarmogoyf });

    const model = new Model_NerdShak();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Nerd Shak');
    expect(results.length).toBe(8);
    expect(results).toStrictEqual(nerdShakExpectedResultsTarmogoyf);
  });

});
