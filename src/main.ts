import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import apiClient from './api/ApiClient';
import config from './Config';
import FileParser from './FileParser';

config.loadFromEnv();

const shouldSubmit = async (exportStrings: string[]): Promise<boolean> => {
  const data = await readFile(path.join(__dirname, '/../cache.json'), 'binary');
  return data !== JSON.stringify(exportStrings);
};

const updateCache = async (data: string[]) => {
  await writeFile(path.join(__dirname, '/../cache.json'), JSON.stringify(data));
};

const run = async () => {
  const fileParser = new FileParser(config.get('savedVariablesPath'));
  const exportStrings = await fileParser.parse();
  if (await shouldSubmit(exportStrings)) {
    exportStrings.forEach(async (importString) => {
      await apiClient.postImportString(importString)
        .then(() => updateCache(exportStrings))
        .catch(error => console.log(error));
    });

    console.log('submitting update');
  } else {
    console.log('not submitting');
  }

  await apiClient.getAccessLink().then(link => console.log(link.data.url));
};

run();
