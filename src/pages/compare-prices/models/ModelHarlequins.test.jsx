import axios from 'axios';
import ModelHarlequins from './ModelHarlequins';
import {
  harlequinsExpectedResultsScaldingTarn,
  harlequinsResponseScaldingTarn
} from './test-resources/model-harlequins-search-response-scalding-tarn';

jest.mock('axios');


describe('ModelHarlequins', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: harlequinsResponseScaldingTarn });

    const model = new ModelHarlequins();
    const results = await model.search('Scalding Tarn');

    expect(model.name).toBe('Harlequins');
    expect(results.length).toBe(4);
    expect(results).toStrictEqual(harlequinsExpectedResultsScaldingTarn);
  });

});
