import axios from 'axios';
import ModelMagicMadhouse from './ModelMagicMadhouse';
import { madhouseResponseTarmogoyf, madhouseExpextedResultsTarmogoyf } from './test-resources/model-magic-madhouse-response-tarmogoyf';
import { madhouseResponseRavenFamiliar, madhouseExpextedResultsRavenFamiliar } from "./test-resources/model-magic-madhouse-response-raven-familiar";

jest.mock('axios');


describe('ModelMagicMadhouse', () => {

  it('gets results for tarmagoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: madhouseResponseTarmogoyf });

    const model = new ModelMagicMadhouse();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Magic Madhouse');
    expect(results.length).toBe(21);
    expect(results).toStrictEqual(madhouseExpextedResultsTarmogoyf);
  });

  it('gets results for raven familiar', async () => {
    axios.get.mockResolvedValueOnce({ data: madhouseResponseRavenFamiliar });

    const model = new ModelMagicMadhouse();
    const results = await model.search('Raven Familiar');

    expect(model.name).toBe('Magic Madhouse');
    expect(results.length).toBe(3);
    expect(results).toStrictEqual(madhouseExpextedResultsRavenFamiliar);
  });

});
