import axios from 'axios';
import Model_ManaLeak from '../Model_ManaLeak';
import { response_manaLeak_Tarmogoyf, expectedResults_manaLeak_Tarmogoyf } from './test-resources/model-mana-leak-response-tarmogoyf';

jest.mock('axios');


describe('ModelManaLeak', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: response_manaLeak_Tarmogoyf });

    const model = new Model_ManaLeak();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Manaleak');
    expect(results.length).toBe(13);
    expect(results).toStrictEqual(expectedResults_manaLeak_Tarmogoyf);
  });

});
