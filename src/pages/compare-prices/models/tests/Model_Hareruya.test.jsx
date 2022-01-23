import axios from 'axios';
import Model_Hareruya from '../Model_Hareruya';
import {
  expectedResults_hareruya_Tarmogoyf,
  response_hareruya_Tarmogoyf
} from './test-resources/model-hareruya-search-response-tarmogoyf';

jest.mock('axios');


describe('Model_Hareruya', () => {

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: response_hareruya_Tarmogoyf });

    const model = new Model_Hareruya();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Hareruya');
    expect(results.length).toBe(24);
    expect(results).toStrictEqual(expectedResults_hareruya_Tarmogoyf);
  });

});
