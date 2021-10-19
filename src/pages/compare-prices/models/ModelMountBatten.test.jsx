import axios from 'axios';
import ModelMountBatten from './ModelMountBatten';
import { mountBattenResponseScaldingTarn, mountBattenExpectedResultsScaldingTarn } from './test-resources/model-mount-batten-response-scalding-tarn';

jest.mock('axios');


describe('ModelAxion', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: mountBattenResponseScaldingTarn });

    const model = new ModelMountBatten();
    const results = await model.search('Scalding Tarn');

    expect(model.name).toBe('MountBatten');
    expect(results.length).toBe(2);
    expect(results).toStrictEqual(mountBattenExpectedResultsScaldingTarn);
  });

});
