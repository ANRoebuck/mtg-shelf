import axios from 'axios';
import ModelManaLeak from './ModelManaLeak';
import { html, expectedResults } from './test-resources/model-mana-leak-response-tarmogoyf';

jest.mock('axios');


describe('ModelManaLeak', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: html });

    const model = new ModelManaLeak();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Manaleak');
    expect(results.length).toBe(13);
    expect(results).toStrictEqual(expectedResults);
  });

});
