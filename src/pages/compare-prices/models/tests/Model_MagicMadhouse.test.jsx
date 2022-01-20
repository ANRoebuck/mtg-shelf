import axios from 'axios';
import Model_MagicMadhouse from '../Model_MagicMadhouse';
import { response_magicMadhouse_Tarmogoyf, expectedResults_magicMadhouse_Tarmogoyf } from './test-resources/model-magic-madhouse-response-tarmogoyf';
import { response_magicMadhouse_RavenFamiliar, expectedResults_magicMadhouse_RavenFamiliar } from "./test-resources/model-magic-madhouse-response-raven-familiar";

jest.mock('axios');


describe('ModelMagicMadhouse', () => {

  it('gets results for tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: response_magicMadhouse_Tarmogoyf });

    const model = new Model_MagicMadhouse();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Magic Madhouse');
    expect(results.length).toBe(13);
    expect(results).toStrictEqual(expectedResults_magicMadhouse_Tarmogoyf);
  });

  it('gets results for raven familiar', async () => {
    axios.get.mockResolvedValueOnce({ data: response_magicMadhouse_RavenFamiliar });

    const model = new Model_MagicMadhouse();
    const results = await model.search('Raven Familiar');

    expect(model.name).toBe('Magic Madhouse');
    expect(results.length).toBe(3);
    expect(results).toStrictEqual(expectedResults_magicMadhouse_RavenFamiliar);
  });

});
