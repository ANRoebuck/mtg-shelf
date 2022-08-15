import axios from 'axios';
import Model_NerdShak from '../Model_NerdShak';
import {
  expectedResults_nerdShak_WateryGrave,
  response_nerdShak_WateryGrave
} from './test-resources/model-nerd-shak-search-response-watery-grave';

jest.mock('axios');


describe('Model_NerdShak', () => {

  it('gets results for Watery Grave', async () => {
    axios.get.mockResolvedValueOnce({ data: response_nerdShak_WateryGrave });

    const model = new Model_NerdShak();
    const results = await model.search('Watery Grave');

    expect(model.name).toBe('Nerd Shak');
    expect(results.length).toBe(6);
    expect(results).toStrictEqual(expectedResults_nerdShak_WateryGrave);
  });

});
