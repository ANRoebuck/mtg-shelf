import axios from 'axios';
import ModelHareruya from "./ModelHareruya";
import {
  hareruyaExpectedResultsTarmogoyf,
  hareruyaResponseTarmogoyf
} from "./test-resources/model-hareruya-search-response-tarmogoyf";

jest.mock('axios');


describe('ModelHareruya', () => {

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: hareruyaResponseTarmogoyf });

    const model = new ModelHareruya();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Hareruya');
    expect(results.length).toBe(24);
    expect(results).toStrictEqual(hareruyaExpectedResultsTarmogoyf);
  });

});
