import axios from 'axios';
import ModelMountBatten from '../Model_MountbattenCollectables';
import { response_mountbattenCollectables_ScaldingTarn, expectedResults_mountbattenCollectables_ScaldingTarn } from './test-resources/model-mount-batten-response-scalding-tarn';

jest.mock('axios');


describe('ModelAxion', () => {

  it('gets results', async () => {
    axios.get.mockResolvedValueOnce({ data: response_mountbattenCollectables_ScaldingTarn });

    const model = new ModelMountBatten();
    const results = await model.search('Scalding Tarn');

    expect(model.name).toBe('Mountbatten Collectables');
    expect(results.length).toBe(2);
    expect(results).toStrictEqual(expectedResults_mountbattenCollectables_ScaldingTarn);
  });

});
