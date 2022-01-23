import axios from 'axios';
import Model_LazyDragonGaming from '../Model_LazyDragonGaming';
import {
  expectedResults_lazyDragonGaming_ShipwreckMarsh,
  response_lazyDragonGaming_ShipwreckMarsh
} from './test-resources/model-lazy-dragon-gaming-search-response-shipwreck-marsh';

jest.mock('axios');


describe('Model_LazyDragonGaming', () => {

  it('gets results for Shipwreck Marsh', async () => {
    axios.get.mockResolvedValueOnce({ data: response_lazyDragonGaming_ShipwreckMarsh });

    const model = new Model_LazyDragonGaming();
    const results = await model.search('Shipwreck Marsh');

    expect(model.name).toBe('Lazy Dragon Gaming');
    expect(results.length).toBe(3);
    expect(results).toStrictEqual(expectedResults_lazyDragonGaming_ShipwreckMarsh);
  });

});
