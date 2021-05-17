import { createHttpClient } from './http-client';
import { AxiosInstance } from 'axios';

import Config from '../Config';

class ApiClient {
    private httpClient: AxiosInstance = createHttpClient(Config.get('cgbApiToken'));

    public async postImportString (importString: string): Promise<any> {
      const result = await this.httpClient.post(`/guild/UploadImportString/${Config.get('cgbBankId')}`, { EncodedImportString: importString });
      return result;
    }

    public async getTestRoute (): Promise<any> {
      return await this.httpClient.get('/test');
    }
}

export default new ApiClient();
