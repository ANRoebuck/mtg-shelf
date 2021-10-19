import axios from 'axios';
import ModelBigOrbitCards from './ModelBigOrbitCards';
import { bigOrbitResponseTarmogoyf, bigOrbitExpectedResultsTarmogoyf } from './test-resources/model-big-orbit-cards-response-tarmogoyf';

jest.mock('axios');


describe('ModelBigOrbitCards', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: bigOrbitResponseTarmogoyf });

    const model = new ModelBigOrbitCards();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Big Orbit Cards');
    expect(results.length).toBe(12);
    expect(results).toStrictEqual(bigOrbitExpectedResultsTarmogoyf);
  });

});
