import { createHttpClient } from './http-client';
import { AxiosInstance } from 'axios';

import Config from '../Config';

class ApiClient {
    private httpClient: AxiosInstance;

    constructor () {
      Config.loadFromEnv();
      const token: string = Config.get('cgbApiToken');
      const baseUrl: string = Config.get('cgbApiUrl');
      this.httpClient = createHttpClient(token, baseUrl);
    }

    public async postImportString (importString: string): Promise<any> {
      const result = await this.httpClient.post('/import', { EncodedImportString: importString });
      return result;
    }

    public async getTestRoute (): Promise<any> {
      return await this.httpClient.get('/test');
    }
}

export default new ApiClient();
