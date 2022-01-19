import axios from 'axios';
import Model_Axion from '../Model_Axion';
import { axionResponseTarmogoyf, axionExpectedResultsTarmogoyf } from './test-resources/model-axion-search-response-tarmogoyf';

jest.mock('axios');


describe('ModelAxion', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: axionResponseTarmogoyf });

    const model = new Model_Axion();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Axion Now');
    expect(results.length).toBe(12);
    expect(results).toStrictEqual(axionExpectedResultsTarmogoyf);
  });

});
