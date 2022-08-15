import axios from 'axios';
import Model_Axion from '../Model_Axion';
import { response_axion_Tarmogoyf, expectedResults_axion_Tarmogoyf } from './test-resources/model-axion-search-response-tarmogoyf';

jest.mock('axios');


describe('Model_Axion', () => {

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: response_axion_Tarmogoyf });

    const model = new Model_Axion();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Axion Now');
    expect(results.length).toBe(12);
    expect(results).toStrictEqual(expectedResults_axion_Tarmogoyf);
  });

});
