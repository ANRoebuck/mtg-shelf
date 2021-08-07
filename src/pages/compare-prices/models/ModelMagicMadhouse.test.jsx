import axios from 'axios';
import ModelMagicMadhouse from './ModelMagicMadhouse';
import { html, expectedResults } from './test-resources/model-magic-madhouse-response-tarmogoyf.';

jest.mock('axios');


describe('ModelMagicMadhouse', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: html });

    const model = new ModelMagicMadhouse();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Magic Madhouse');
    expect(results.length).toBe(14);
    expect(results).toStrictEqual(expectedResults);
  });

});
