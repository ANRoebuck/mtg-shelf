import axios from 'axios';
import Model_LvlUp from "../Model_LvlUp";
import {
  expectedResults_lvlUp_MistyRainforest,
  response_lvlUp_MistyRainforest
} from './test-resources/model-lvl-up-search-response-misty-rainforest';

jest.mock('axios');


describe('Model_LvlUp', () => {

  it('gets results for Misty Rainforest', async () => {
    axios.get.mockResolvedValueOnce({ data: response_lvlUp_MistyRainforest });

    const model = new Model_LvlUp();
    const results = await model.search('Misty Rainforest');

    expect(model.name).toBe('Lvl Up Gaming');
    expect(results.length).toBe(3);
    expect(results).toStrictEqual(expectedResults_lvlUp_MistyRainforest);
  });

});
