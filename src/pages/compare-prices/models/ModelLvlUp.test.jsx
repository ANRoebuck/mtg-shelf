import axios from 'axios';
import ModelLvlUp from "./ModelLvlUp";
import {
  lvlUpExpectedResultsScaldingTarn,
  lvlUpResponseScaldingTarn
} from './test-resources/model-lvl-up-search-response-scalding-tarn';

jest.mock('axios');


describe('ModelLvlUp', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: lvlUpResponseScaldingTarn });

    const model = new ModelLvlUp();
    const results = await model.search('Scalding Tarn');

    expect(model.name).toBe('Lvl Up Gaming');
    expect(results.length).toBe(10);
    expect(results).toStrictEqual(lvlUpExpectedResultsScaldingTarn);
  });

});
