import axios from 'axios';
import Model_Harlequins from '../Model_Harlequins';
import {
  expectedResults_harlequins_ScaldingTarn,
  response_harlequins_ScaldingTarn
} from './test-resources/model-harlequins-search-response-scalding-tarn';
import {
  expectedResults_harlequins_Tarmogoyf,
  response_harlequins_Tarmogoyf
} from './test-resources/model-harlequins-search-response-tarmogoyf';

jest.mock('axios');


describe('ModelHarlequins', () => {

  it('gets results for Scalding Tarn', async () => {
    axios.get.mockResolvedValueOnce({ data: response_harlequins_ScaldingTarn });

    const model = new Model_Harlequins();
    const results = await model.search('Scalding Tarn');

    expect(model.name).toBe('Harlequins');
    expect(results.length).toBe(4);
    expect(results).toStrictEqual(expectedResults_harlequins_ScaldingTarn);
  });

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: response_harlequins_Tarmogoyf });

    const model = new Model_Harlequins();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Harlequins');
    expect(results.length).toBe(3);
    expect(results).toStrictEqual(expectedResults_harlequins_Tarmogoyf);
  });

});
