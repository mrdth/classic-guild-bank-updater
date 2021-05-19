import mockAxios from 'jest-mock-axios';
import apiClient from '../api/ApiClient';

import config from '../Config';

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

describe('ApiClient', () => {
  it('can GET the test route', () => {
    apiClient.getTestRoute();
    expect(mockAxios.get).toHaveBeenCalledWith('/test');
  });

  it('can POST bank data updates', () => {
    const testString = 'This is a test string';
    apiClient.postImportString(testString);

    expect(mockAxios.post).toHaveBeenCalledWith(
      '/import',
      { EncodedImportString: testString }
    );
  });
});
