import axios, { AxiosInstance } from 'axios';

export const createHttpClient = (apiToken: string = '', baseUrl: string = ''): AxiosInstance => {
  let headers = {};
  if (apiToken) {
    headers = {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    };
  }
  const client = axios.create({ baseURL: baseUrl, headers });
  client.interceptors.request.use(request => {
    console.log(`[${new Date().toISOString()}] Request: ${request.url}`);
    // console.log(`Headers: ${headers.Authorization}`);
    return request;
  });
  client.interceptors.response.use(response => {
    console.log(`[${new Date().toISOString()}] Response: ${response.status}`);
    return response;
  });

  return client;
};
