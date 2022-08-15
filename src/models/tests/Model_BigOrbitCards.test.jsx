import axios from 'axios';
import Model_BigOrbitCards from '../Model_BigOrbitCards';
import { response_bigOrbit_Tarmogoyf, expectedResults_bigOrbit_Tarmogoyf } from './test-resources/model-big-orbit-cards-response-tarmogoyf';

jest.mock('axios');


describe('Model_BigOrbitCards', () => {

  it('gets results for Tarmogoyf', async () => {
    axios.get.mockResolvedValueOnce({ data: response_bigOrbit_Tarmogoyf });

    const model = new Model_BigOrbitCards();
    const results = await model.search('Tarmogoyf');

    expect(model.name).toBe('Big Orbit Cards');
    expect(results.length).toBe(12);
    expect(results).toStrictEqual(expectedResults_bigOrbit_Tarmogoyf);
  });

});
